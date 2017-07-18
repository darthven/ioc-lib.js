"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var core_module_1 = require("../core-module");
var validation_module_1 = require("../../validation-module/validation-module");
var jsonfile = require("jsonfile");
var APPLICATION_ROOT_DIRECTORY = require('app-root-dir').get();
/**
 * Class that responds for creation and management process of the components,
 * for updating and closing application context in safe-mode,
 * simple representation of Inversion of Control Container based on metadata from
 * configuration files in JSON-format
 */
var MetadataContext = (function (_super) {
    __extends(MetadataContext, _super);
    /**
     * Context constructor
     * @param configs paths to the configuration files
     */
    function MetadataContext(configs) {
        var _this = _super.call(this) || this;
        if (configs) {
            validation_module_1.MetadataValidator.validateMetadata(configs);
            _this.configs = configs;
            _this.registerComponentsInContext();
            MetadataContext.logger.info('[MetadataContext]: Context was initialized');
        }
        return _this;
    }
    /**
     * Function that reads configuration files in JSON format
     * and retrieves an array of objects
     * @returns {Object[]} objects which will be analyzed by application context
     * on the next step of the initializing process
     */
    MetadataContext.prototype.parseMetadataFromConfigurationFile = function () {
        var objects = [];
        this.configs.forEach(function (config) {
            var configFile = jsonfile.readFileSync(config).configuration;
            objects.push({ configName: config, config: configFile });
        });
        return objects;
    };
    /**
     * Function that retrieves properties' values
     * of the object that was retrieved from meta-data
     * @param {Object} configComponent parsed object from configuration file
     * @param {Object} entity custom class instance
     * @returns {Object[]} array of properties (with values)
     */
    MetadataContext.prototype.getPropertiesFromConfiguration = function (configComponent, entity) {
        var propertiesFromContext = configComponent['properties'];
        var properties = [];
        if (propertiesFromContext) {
            propertiesFromContext.forEach(function (prop) {
                var entityPropertyNames = Object.getOwnPropertyNames(entity['default']['prototype']);
                var propertyName = entityPropertyNames.find(function (propName) { return propName === prop['name']; });
                if (prop['value'] && propertyName) {
                    properties.push({
                        name: prop['name'],
                        value: prop['value']
                    });
                }
                else if (prop['reference'] && propertyName) {
                    properties.push({
                        name: prop['name'],
                        reference: prop['reference']
                    });
                }
            });
        }
        return properties;
    };
    /**
     * Function that defines the scope of the object from meta-data
     * (SINGLETON scope means component based on this object will be created
     * once in the application context, PROTOTYPE scope means component can be
     * created several times as the copies of the one main instance)
     * @param {Object} configComponent parsed object from configuration file
     * @returns {Scope} scope of the parsed object (SINGLETON by default)
     */
    MetadataContext.prototype.defineComponentScope = function (configComponent) {
        if (configComponent['scope'] === 'singleton') {
            return 0 /* SINGLETON */;
        }
        else if (configComponent['scope'] === 'prototype') {
            return 1 /* PROTOTYPE */;
        }
        return 0 /* SINGLETON */;
    };
    /**
     * Function that sets properties (values) to the possible component
     * in the application context (basic step of registering component in the context)
     * and executes method before its initialization
     * @param {Object[]} configComponents parsed objects from meta-data
     * @param {Map<string, Component>} basicComponents unregistered components in their basic form
     * (without values, without references)
     */
    MetadataContext.prototype.setBasicPropertiesToComponents = function (configComponents, basicComponents) {
        var _this = this;
        configComponents.forEach(function (configComp) {
            var classPath = APPLICATION_ROOT_DIRECTORY + "/" + configComp['classPath'];
            var entityClass = require(classPath);
            var entityPrototype = entityClass.default.prototype;
            var entity = Object.create(entityPrototype);
            validation_module_1.LifecycleValidator.validateLifecycle(_this, entityPrototype, configComp);
            var componentLifecycle = _this.getContextLifecycle().getComponentLifecycles().get(configComp['id']);
            componentLifecycle.callPreInitMethod();
            var component = new core_module_1.Component(configComp['id'], configComp['name'], configComp['classPath'], _this.defineComponentScope(configComp));
            var properties = _this.getPropertiesFromConfiguration(configComp, entityClass);
            var propertiesAreValid = validation_module_1.PropertyValidator.validateProperties(properties);
            if (propertiesAreValid) {
                properties.forEach(function (prop) {
                    if (prop['value']) {
                        entity[prop['name']] = prop['value'];
                    }
                    else {
                        entity[prop['name']] = null;
                    }
                });
                componentLifecycle.callBeforePropertiesWillBeSetMethod();
                component.setEntityInstance(entity);
                basicComponents.set(configComp['id'], component);
                componentLifecycle.callPostInitMethod();
            }
            else {
                throw new validation_module_1.PropertyValidationError(configComp['id']);
            }
        });
    };
    /**
     * Function that sets properties (references) to the possible component
     * in the application context (last step of registering component in the context)
     * and executes method after setting all properties to it
     * @param {Object[]} configComponents parsed objects from meta-data
     * (with values, without references)
     */
    MetadataContext.prototype.setReferencesToComponents = function (configComponents) {
        var _this = this;
        this.components.forEach(function (component) {
            var componentLifecycle = _this.getContextLifecycle().getComponentLifecycles().get(component.getId());
            configComponents.forEach(function (comp) {
                var classPath = APPLICATION_ROOT_DIRECTORY + "/" + comp['classPath'];
                var entityClass = require(classPath);
                var entity = _this.getComponentEntityInstance(comp['id']);
                var properties = _this.getPropertiesFromConfiguration(comp, entityClass);
                properties.forEach(function (prop) {
                    if (prop['reference']) {
                        entity[prop['name']] = _this.getComponentEntityInstance(prop['reference']);
                        component.setEntityInstance(entity);
                    }
                });
            });
            componentLifecycle.callAfterPropertiesWereSetMethod();
        });
    };
    /**
     * Function that returns parsed objects from metadata
     * without duplicates by unique identifiers
     * @returns {Object[]} parsed objects from metadata without duplicates
     */
    MetadataContext.prototype.getUniqueConfigComponents = function () {
        var configComponents = [];
        var objects = this.parseMetadataFromConfigurationFile();
        objects.forEach(function (object) {
            object['config'].components.forEach(function (component) {
                if (!configComponents.find(function (elem) { return elem.id === component.id; })) {
                    configComponents.push(component);
                }
            });
        });
        return configComponents;
    };
    /**
     * Function that returns stable parsed objects from meta-data
     * @returns {Object[]} array of parsed objects
     */
    MetadataContext.prototype.getConfigComponents = function () {
        return this.getUniqueConfigComponents();
    };
    /**
     * Function that registers components in the application context
     */
    MetadataContext.prototype.registerComponentsInContext = function () {
        var configComponents = this.getConfigComponents();
        this.setBasicPropertiesToComponents(configComponents, this.getComponents());
        this.setReferencesToComponents(configComponents);
    };
    /**
     * Function that updates context. Can be called if you need to update context
     * after updating meta-data in configuration files
     */
    MetadataContext.prototype.updateContext = function () {
        this.registerComponentsInContext();
    };
    return MetadataContext;
}(core_module_1.Context));
exports.default = MetadataContext;
