"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = require("./Component");
var Property_1 = require("./Property");
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
            //console.log(config);
            var json = jsonfile.readFileSync(config).configuration;
            //console.log(json);
            objects.push({ configName: config, config: json });
        });
        // objects.forEach((obj) => {
        //   obj.config.components.for
        //   console.log(obj.con)
        // })
        return objects;
    };
    Context.prototype.updateContext = function () {
        this.putComponentsFromConfigurationIntoContext();
    };
    Context.prototype.putComponentsFromConfigurationIntoContext = function () {
        var _this = this;
        var components = new Map();
        var configComponents = this.getSortedComponentsByComplexity(this.getUniqueConfigComponents());
        //console.log(configComponents);
        configComponents.forEach(function (comp) {
            var lifecycle = comp.lifecycle;
            var entity = require(comp.classPath).default.prototype;
            if (entity[lifecycle.initMethod]) {
                entity[lifecycle.initMethod].call();
            }
            var component = new Component_1.default(comp.id, comp.name, comp.classPath, _this.defineComponentScope(comp), comp.lifecycle);
            var properties = _this.getPropertiesFromConfiguration(comp, components);
            component.setProperties(properties);
            if (entity[lifecycle.afterPropertiesWereSetMethod]) {
                entity[lifecycle.afterPropertiesWereSetMethod].call();
            }
            components.set(comp.id, Object.assign(component, entity));
        });
        this.components = components;
        console.log(this.components);
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
    Context.prototype.getPropertiesFromConfiguration = function (component, components) {
        var propertiesFromContext = component.properties;
        var properties = [];
        if (propertiesFromContext) {
            propertiesFromContext.forEach(function (prop) {
                var property = new Property_1.default(prop.name);
                if (prop['value']) {
                    property.setValue(prop.value);
                }
                else if (prop['reference']) {
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
        //TODO Here should be logic from lifecycle about destroy-methods
        this.components.forEach(function (component) {
            //console.log('Component', component);
            var lifecycle = component.getLifecycle();
            //console.log(lifecycle);
            var destroyMethod = lifecycle['destroyMethod'];
            //console.log('Destroy', destroyMethod);
            component[destroyMethod.toString()].call();
            //process.exit(0);
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
            process.exit(0);
        });
        process.on('SIGINT', function () {
            _this.close();
            process.exit(2);
        });
        process.on('uncaughtException', function (exception) {
            console.error(exception.stack);
            process.exit(99);
        });
    };
    return Context;
}());
exports.default = Context;
