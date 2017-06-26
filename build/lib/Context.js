"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = require("./Component");
var Property_1 = require("./Property");
var ComponentLifecycle_1 = require("./ComponentLifecycle");
var ComponentNotFoundError_1 = require("./ComponentNotFoundError");
var jsonfile = require("jsonfile");
var Context = (function () {
    function Context(configs) {
        this.configs = configs;
        this.putComponentsFromConfigurationIntoContext();
        console.log('Context was initialized');
    }
    Context.prototype.getObjectsFromJSON = function () {
        var objects = [];
        this.configs.forEach(function (config) {
            var configFile = jsonfile.readFileSync(config).configuration;
            objects.push({ configName: config, config: configFile });
        });
        return objects;
    };
    Context.prototype.updateContext = function () {
        this.putComponentsFromConfigurationIntoContext();
    };
    Context.prototype.getConfigComponents = function () {
        return this.getSortedComponentsByComplexity(this.getUniqueConfigComponents());
    };
    Context.prototype.putComponentsFromConfigurationIntoContext = function () {
        var basicComponents = new Map();
        var configComponents = this.getConfigComponents();
        this.setBasicPropertiesToComponents(configComponents, basicComponents);
        this.setReferencesToComponents(configComponents, basicComponents);
        this.components = basicComponents;
        console.log(this.components);
    };
    Context.prototype.setBasicPropertiesToComponents = function (configComponents, basicComponents) {
        var _this = this;
        configComponents.forEach(function (comp) {
            var lifecycle = new ComponentLifecycle_1.default();
            lifecycle.setComponentId(comp.id);
            var entity = require(comp.classPath).default.prototype;
            if (entity[comp.lifecycle.initMethod]) {
                lifecycle.setInitMethod(entity[comp.lifecycle.initMethod]);
                lifecycle.callInitMethod();
            }
            if (entity[comp.lifecycle.destroyMethod]) {
                lifecycle.setDestroyMethod(entity[comp.lifecycle.destroyMethod]);
            }
            var component = new Component_1.default(comp.id, comp.name, comp.classPath, _this.defineComponentScope(comp), lifecycle);
            var properties = _this.getPropertyValuesFromConfiguration(comp);
            component.setProperties(properties);
            if (entity[comp.lifecycle.afterPropertiesWereSetMethod]) {
                lifecycle.setAfterPropertiesWereSetMethod(entity[comp.lifecycle.afterPropertiesWereSetMethod]);
                lifecycle.callAfterPropertiesWereSetMethod();
            }
            basicComponents.set(comp.id, Object.assign(component, entity));
        });
    };
    Context.prototype.setReferencesToComponents = function (configComponents, basicComponents) {
        var _this = this;
        basicComponents.forEach(function (component) {
            configComponents.forEach(function (comp) {
                var references = _this.getPropertyReferencesFromConfiguration(configComponents, comp);
                var currentProperties = component.getProperties();
                component.setProperties(currentProperties.concat(references));
            });
        });
    };
    Context.prototype.getUniqueConfigComponents = function () {
        var configComponents = [];
        var objects = this.getObjectsFromJSON();
        objects.forEach(function (object) {
            object.config.components.forEach(function (component) {
                if (!configComponents.find(function (elem) { return elem.id === component.id; })) {
                    configComponents.push(component);
                }
            });
        });
        return configComponents;
    };
    Context.prototype.defineComponentScope = function (componentFromContext) {
        if (componentFromContext.scope === 'singleton') {
            return 0 /* SINGLETON */;
        }
        else if (componentFromContext.scope === 'prototype') {
            return 1 /* PROTOTYPE */;
        }
        return 0 /* SINGLETON */;
    };
    Context.prototype.getPropertyValuesFromConfiguration = function (component) {
        var propertiesFromContext = component.properties;
        var properties = [];
        if (propertiesFromContext) {
            propertiesFromContext.forEach(function (prop) {
                var property = new Property_1.default(prop.name);
                if (prop['value']) {
                    property.setValue(prop.value);
                }
                properties.push(property);
            });
        }
        return properties;
    };
    Context.prototype.getPropertyReferencesFromConfiguration = function (component, components) {
        var propertiesFromContext = component.properties;
        var properties = [];
        if (propertiesFromContext) {
            propertiesFromContext.forEach(function (prop) {
                var property = new Property_1.default(prop.name);
                if (prop['reference']) {
                    property.setReference(components.get(prop.reference));
                }
                properties.push(property);
            });
        }
        return properties;
    };
    Context.prototype.isSimpleComponent = function (componentFromContext) {
        return componentFromContext.properties.some(function (prop) { return prop['reference']; });
    };
    Context.prototype.getSortedComponentsByComplexity = function (componentsFromContext) {
        var _this = this;
        return componentsFromContext.sort(function (comp1, comp2) { return _this.isSimpleComponent(comp1) > _this.isSimpleComponent(comp2); });
    };
    Context.prototype.getComponent = function (componentId) {
        var component = this.components.get(componentId);
        if (!component) {
            throw new ComponentNotFoundError_1.default("Component was not found by id \"" + componentId + "\"");
        }
        if (component.getScope() === 1 /* PROTOTYPE */) {
            return Object.assign({}, component);
        }
        return component;
    };
    Context.prototype.removeComponentFromContext = function (componentId) {
        return this.components.delete(componentId);
    };
    Context.prototype.close = function () {
        console.log('Closing current context...');
        this.components.forEach(function (component) {
            var lifecycle = component.getLifecycle();
            //console.log(lifecycle);
            lifecycle.callDestroyMethod();
        });
        console.log('Context is closed...');
        this.components.clear();
        this.configs = null;
    };
    Context.prototype.registerShutdownHook = function () {
        var _this = this;
        //console.log(process);
        process.on('exit', function () {
            _this.close();
        });
        process.on('SIGINT', function () {
            _this.close();
        });
        process.on('uncaughtException', function (exception) {
            _this.close();
            console.error(exception.stack);
            process.exit(99);
        });
    };
    return Context;
}());
exports.default = Context;
