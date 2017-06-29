"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_module_1 = require("../core-module");
var validation_module_1 = require("../../validation-module/validation-module");
var jsonfile = require("jsonfile");
/**
 * Class that responds for creation and management process of the components,
 * for updating and closing application context in safe-mode,
 * simple representation of Inversion of Control Container
 */
var Context = (function () {
    /**
     * Context constructor
     * @param configs paths to the configuration files
     */
    function Context(configs) {
        this.configs = configs;
        this.registerComponentsInContext();
        Context.logger.info('Context was initialized');
    }
    /**
     * Function that reads configuration files in JSON format
     * and retrieves an array of objects
     * @returns {Object[]} objects which will be analyzed by application context
     * on the next step of the initializing process
     */
    Context.prototype.parseMetadataFromConfigurationFile = function () {
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
     * @returns {Property[]} array of properties (with values)
     */
    Context.prototype.getPropertyValuesFromConfiguration = function (configComponent) {
        var propertiesFromContext = configComponent['properties'];
        var properties = [];
        if (propertiesFromContext) {
            propertiesFromContext.forEach(function (prop) {
                var property = new core_module_1.Property(prop.name);
                if (prop['value']) {
                    property.setValue(prop.value);
                    properties.push(property);
                }
            });
        }
        return properties;
    };
    /**
     * Function that retrieves properties' references
     * of the current object to other objects by unique identifier
     * that was retrieved from meta-data
     * @param {Object} configComponent parsed object from configuration file
     * @returns {Property[]} array of properties (with references to other objects by
     * unique identifiers)
     */
    Context.prototype.getPropertyReferencesFromConfiguration = function (configComponent) {
        var propertiesFromContext = configComponent['properties'];
        var properties = [];
        if (propertiesFromContext) {
            propertiesFromContext.forEach(function (prop) {
                var property = new core_module_1.Property(prop.name);
                if (prop['reference']) {
                    property.setReference(prop.reference);
                    properties.push(property);
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
    Context.prototype.defineComponentScope = function (configComponent) {
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
    Context.prototype.setBasicPropertiesToComponents = function (configComponents, basicComponents) {
        var _this = this;
        configComponents.forEach(function (comp) {
            //const classPath = `../../../../../../${comp.classPath}`;
            var classPath = "../../" + comp['classPath'];
            var entity = require(classPath).default.prototype;
            var lifecycle = validation_module_1.LifecycleValidator.validateLifecycle(entity, comp);
            lifecycle.callInitMethod();
            var component = new core_module_1.Component(comp['id'], comp['name'], comp['classPath'], _this.defineComponentScope(comp), lifecycle);
            var properties = _this.getPropertyValuesFromConfiguration(comp);
            var propertiesAreValid = validation_module_1.PropertyValidator.validateProperties(properties);
            if (propertiesAreValid) {
                component.setProperties(properties);
                basicComponents.set(comp['id'], Object.assign(component, entity));
            }
            else {
                _this.close();
            }
        });
    };
    /**
     * Function that sets properties (references) to the possible component
     * in the application context (last step of registering component in the context)
     * and executes method after setting all properties to it
     * @param {Object[]} configComponents parsed objects from meta-data
     * @param {Map<string, Component>} basicComponents unregistered components in their basic form
     * (with values, without references)
     */
    Context.prototype.setReferencesToComponents = function (configComponents, basicComponents) {
        var _this = this;
        basicComponents.forEach(function (component) {
            configComponents.forEach(function (comp) {
                var references = _this.getPropertyReferencesFromConfiguration(comp);
                var currentProperties = component.getProperties();
                component.setProperties(currentProperties.concat(references));
                component.getLifecycle().callAfterPropertiesWereSetMethod();
            });
        });
    };
    /**
     * Function that returns parsed objects from meta-data
     * without duplicates by unique identifiers
     * @returns {Object[]} parsed objects from meta-data without duplicates
     */
    Context.prototype.getUniqueConfigComponents = function () {
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
    Context.prototype.getConfigComponents = function () {
        return this.getUniqueConfigComponents();
    };
    /**
     * Function that registers components in the application context
     */
    Context.prototype.registerComponentsInContext = function () {
        var basicComponents = new Map();
        var configComponents = this.getConfigComponents();
        this.setBasicPropertiesToComponents(configComponents, basicComponents);
        this.setReferencesToComponents(configComponents, basicComponents);
        this.components = basicComponents;
    };
    /**
     * Function that removes component from application context by unique identifier
     * @param {string} componentId unique identifier of the component
     * @returns {boolean}
     */
    Context.prototype.removeComponentFromContext = function (componentId) {
        return this.components.delete(componentId);
    };
    /**
     * Function that removes all components from application context,
     * calls destroy-methods before their deletion and finally closes it
     */
    Context.prototype.close = function () {
        var _this = this;
        Context.logger.info('Closing current context...');
        this.components.forEach(function (component) {
            var lifecycle = component.getLifecycle();
            lifecycle.callDestroyMethod();
            _this.removeComponentFromContext(component.getId());
        });
        Context.logger.info('Context is closed...');
        this.components.clear();
        this.configs = null;
    };
    /**
     * Function that updates context. Can be called if you need to update context
     * after updating meta-data in configuration files
     */
    Context.prototype.updateContext = function () {
        this.registerComponentsInContext();
    };
    /**
     * Function that retrieves component's instance by unique identifier
     * @param {string} componentId unique identifier of the component
     * @returns component's instance
     */
    Context.prototype.getComponent = function (componentId) {
        var component = this.components.get(componentId);
        if (!component) {
            throw new core_module_1.ComponentNotFoundError("Component was not found by id \"" + componentId + "\"");
        }
        if (component.getScope() === 1 /* PROTOTYPE */) {
            return Object.assign({}, component);
        }
        return component;
    };
    /**
     * Function that closes application context in safe-mode
     * as the main program's process is finished.
     */
    Context.prototype.registerShutdownHook = function () {
        var _this = this;
        process.on('exit', function () {
            _this.close();
        });
        process.on('SIGINT', function () {
            _this.close();
        });
    };
    return Context;
}());
/**
 * Logger for logging all important events in the application context
 */
Context.logger = require('log4js').getLogger();
exports.default = Context;
