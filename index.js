'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var util = require('util');

var log4js = require('log4js');
var LOGGER = log4js.getLogger();

/**
 * Class that is responsive for the components' lifecycle
 * management in the application context.
 */
var ComponentLifecycle = (function () {
    /**
     * Component's constructor
     * @param componentId id of the component
     */
    function ComponentLifecycle(componentId) {
        this.componentId = componentId;
        this.setDefaultLifecycleMethods();
    }
    /**
     * Function that sets default lifecycle methods.
     * They can be override by custom methods which are
     * described in metadata from configuration files
     */
    ComponentLifecycle.prototype.setDefaultLifecycleMethods = function () {
        var _this = this;
        this.preInitMethod =
            function () { return LOGGER.info("[Component Lifecycle]: Default pre-init-method is called to the component with id \"" + _this.componentId + "\""); };
        this.postInitMethod =
            function () { return LOGGER.info("[Component Lifecycle]: Default post-init-method is called to the component with id \"" + _this.componentId + "\""); };
        this.beforePropertiesWillBeSetMethod =
            function () { return LOGGER.info("[Component Lifecycle]: Default before-properties-will-be-set-method is called to the component with id \"" + _this.componentId + "\""); };
        this.afterPropertiesWereSetMethod =
            function () { return LOGGER.info("[Component Lifecycle]: Default after-properties-were-set-method is called to the component with id \"" + _this.componentId + "\""); };
        this.preDestroyMethod =
            function () { return LOGGER.info("[Component Lifecycle]: Default pre-destroy-method is called to the component with id \"" + _this.componentId + "\""); };
        this.postDestroyMethod =
            function () { return LOGGER.info("[Component Lifecycle]: Default post-destroy-method is called to the component with id \"" + _this.componentId + "\""); };
    };
    /**
     * Function that returns component's unique identifier
     * @returns {string} unique identifier of the component
     */
    ComponentLifecycle.prototype.getComponentId = function () {
        return this.componentId;
    };
    /**
     * Function that sets the component's unique identifier to its lifecycle
     * @param {string} componentId unique identifier of the component
     */
    ComponentLifecycle.prototype.setComponentId = function (componentId) {
        this.componentId = componentId;
    };
    /**
     * Function that executes pre-init-method of the component
     */
    ComponentLifecycle.prototype.callPreInitMethod = function () {
        LOGGER.debug("[Component Lifecycle]: Before Component with id \"" + this.getComponentId() + "\" will be initialized");
        this.preInitMethod();
    };
    /**
     * Function that sets pre-init-method of the component to its lifecycle
     * @param {Function} preInitMethod is called before the initialization of the component
     */
    ComponentLifecycle.prototype.setPreInitMethod = function (preInitMethod) {
        this.preInitMethod = preInitMethod;
    };
    /**
     * Function that executes post-init-method of the component
     */
    ComponentLifecycle.prototype.callPostInitMethod = function () {
        LOGGER.debug("[Component Lifecycle]: After Component with id \"" + this.getComponentId() + "\" was initialized");
        this.postInitMethod();
    };
    /**
     * Function that sets post-init-method of the component to its lifecycle
     * @param {Function} postInitMethod is called after the initialization of the component
     */
    ComponentLifecycle.prototype.setPostInitMethod = function (postInitMethod) {
        this.postInitMethod = postInitMethod;
    };
    /**
     * Function that is executed before setting all properties of the component
     */
    ComponentLifecycle.prototype.callBeforePropertiesWillBeSetMethod = function () {
        LOGGER.debug("[Component Lifecycle]: Before Component with id \"" + this.getComponentId() + "\" will receive its properties");
        this.beforePropertiesWillBeSetMethod();
    };
    /**
     * Function that sets method that will be executed before setting
     * all properties of the component to its lifecycle
     * @param {Function} beforePropertiesWillBeSetMethod is called before setting
     * all properties to the component
     */
    ComponentLifecycle.prototype.setBeforePropertiesWillBeSetMethod = function (beforePropertiesWillBeSetMethod) {
        this.beforePropertiesWillBeSetMethod = beforePropertiesWillBeSetMethod;
    };
    /**
     * Function that is executed after setting all properties of the component
     */
    ComponentLifecycle.prototype.callAfterPropertiesWereSetMethod = function () {
        LOGGER.debug("[Component Lifecycle]: After Component with id \"" + this.getComponentId() + "\" received its properties");
        this.afterPropertiesWereSetMethod();
    };
    /**
     * Function that sets method that will be executed after setting
     * all properties of the component to its lifecycle
     * @param {Function} afterPropertiesWereSetMethod is called after setting all properties to the component
     */
    ComponentLifecycle.prototype.setAfterPropertiesWereSetMethod = function (afterPropertiesWereSetMethod) {
        this.afterPropertiesWereSetMethod = afterPropertiesWereSetMethod;
    };
    /**
     * Function that is executed before removing component from the application context
     */
    ComponentLifecycle.prototype.callPreDestroyMethod = function () {
        LOGGER.debug("[Component Lifecycle]: Before Component with id \"" + this.getComponentId() + "\" will be destroyed");
        this.preDestroyMethod();
    };
    /**
     * Function that sets method that will be executed before setting
     *  removing component from the application context to its lifecycle
     * @param {Function} preDestroyMethod is called before removing component from the application context
     */
    ComponentLifecycle.prototype.setPreDestroyMethod = function (preDestroyMethod) {
        this.preDestroyMethod = preDestroyMethod;
    };
    /**
     * Function that is executed after removing component from the application context
     */
    ComponentLifecycle.prototype.callPostDestroyMethod = function () {
        LOGGER.debug("[Component Lifecycle]: After Component with id \"" + this.getComponentId() + "\" was destroyed");
        this.postDestroyMethod();
    };
    /**
     * Function that sets method that will be executed after removing component
     * from the application context to its lifecycle
     * @param {Function} postDestroyMethod is called after removing component from the application context
     */
    ComponentLifecycle.prototype.setPostDestroyMethod = function (postDestroyMethod) {
        this.postDestroyMethod = postDestroyMethod;
    };
    /**
     * Function that sets all lifecycle methods to the component's lifecycle instance
     * @param lifecycleMethodsDescriptor descriptor that has methods' names as keys and
     * functions as values
     */
    ComponentLifecycle.prototype.setLifecycleMethods = function (lifecycleMethodsDescriptor) {
        var _this = this;
        Object.keys(lifecycleMethodsDescriptor).forEach(function (methodName) {
            if (_this[methodName] && !util.isNull(lifecycleMethodsDescriptor[methodName])) {
                _this[methodName] = lifecycleMethodsDescriptor[methodName];
            }
        });
    };
    return ComponentLifecycle;
}());

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

/**
 * Class of error that describes situation when the lifecycle of the component
 * cannot be found in application context during dependency lookup process
 */
var LifecycleNotFoundError = (function (_super) {
    __extends(LifecycleNotFoundError, _super);
    function LifecycleNotFoundError(componentId) {
        var _this = _super.call(this, "Lifecycle of the Component with id \"" + componentId + "\" cannot be found in context") || this;
        _this.name = 'LifecycleNotFoundError';
        return _this;
    }
    return LifecycleNotFoundError;
}(Error));

/**
 * Class of the application context's lifecycle
 */
var ContextLifecycle = (function () {
    /**
     * Default constructor of the context's lifecycle
     */
    function ContextLifecycle() {
        this.componentLifecycles = new Map();
    }
    /**
     * Function that returns all lifecycles of all components from the application context
     * @returns {Map<string, ComponentLifecycle>} lifecycles of all components
     */
    ContextLifecycle.prototype.getComponentLifecycles = function () {
        return this.componentLifecycles;
    };
    /**
     * Function that returns lifecycles by its component's unique identifier
     * @param componentId component's unique identifier
     * @returns {ComponentLifecycle} lifecycle of the component
     */
    ContextLifecycle.prototype.getLifecycleByComponentId = function (componentId) {
        var lifecycle = this.componentLifecycles.get(componentId);
        if (!lifecycle) {
            throw new LifecycleNotFoundError(componentId);
        }
        return lifecycle;
    };
    return ContextLifecycle;
}());

/**
 * Class that represents any entity marked as class in the custom application
 * in the application context and allows you to inject other entities to itself
 * according to Dependency Injection mechanism.
 */
var Component = (function () {
    /**
     * Component's constructor
     * @param id unique identifier
     * @param componentName of the component
     * @param classPath path to the class of the entity
     * @param scope of the component
     */
    function Component(id, componentName, classPath, scope) {
        this.id = id || null;
        this.componentName = componentName || null;
        this.classPath = classPath || null;
        this.scope = scope || 0 /* SINGLETON */;
    }
    /**
     * Function that returns component's unique identifier
     * @returns {string} unique identifier
     */
    Component.prototype.getId = function () {
        return this.id;
    };
    /**
     * Function that returns component's name
     * @returns {string} name of the component
     */
    Component.prototype.getComponentName = function () {
        return this.componentName;
    };
    /**
     * Function that returns path to the class of component's entity
     * @returns {string} path to the class
     */
    Component.prototype.getClassPath = function () {
        return this.classPath;
    };
    /**
     * Function that returns scope of the component
     * @returns {Scope} component's scope
     */
    Component.prototype.getScope = function () {
        return this.scope;
    };
    /**
     * Function that returns the entity instance of the class
     * @returns {} entity instance
     */
    Component.prototype.getEntityInstance = function () {
        return this.entityInstance;
    };
    /**
     * Function that sets the entity instance to the component
     * @param entityInstance
     */
    Component.prototype.setEntityInstance = function (entityInstance) {
        this.entityInstance = entityInstance;
    };
    return Component;
}());

/**
 * Class of error that describes situation when the component
 * cannot be found in application context during dependency lookup process
 */
var ComponentNotFoundError = (function (_super) {
    __extends(ComponentNotFoundError, _super);
    function ComponentNotFoundError(componentId) {
        var _this = _super.call(this, "Component with id \"" + componentId + "\" cannot be found in context") || this;
        _this.name = 'ComponentNotFoundError';
        return _this;
    }
    return ComponentNotFoundError;
}(Error));

var _ = require('lodash');
/**
 * Class that responds for creation and management process of the components,
 * for updating and closing application context in safe-mode,
 * simple representation of Inversion of Control Container
 */
var Context = (function () {
    /**
     * Default constructor of the context
     */
    function Context() {
        this.contextLifecycle = new ContextLifecycle();
        this.components = new Map();
    }
    /**
     * Function that returns lifecycle of the context
     * @returns {ContextLifecycle} lifecycle
     */
    Context.prototype.getContextLifecycle = function () {
        return this.contextLifecycle;
    };
    /**
     * Function that returns the map of components with their unique identifiers as keys
     * @returns {Map<string, Component>} map of the components
     */
    Context.prototype.getComponents = function () {
        return this.components;
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
        LOGGER.info('[Context]: Closing current context...');
        this.components.forEach(function (component) {
            var lifecycle = _this.contextLifecycle.getComponentLifecycles().get(component.getId());
            lifecycle.callPreDestroyMethod();
            _this.removeComponentFromContext(component.getId());
            lifecycle.callPostDestroyMethod();
        });
        LOGGER.info('[Context]: Context is closed...');
        this.components.clear();
    };
    /**
     * Function that retrieves component's instance by unique identifier
     * @param {string} componentId unique identifier of the component
     * @returns component's entity instance
     */
    Context.prototype.getComponentEntityInstance = function (componentId) {
        var component = this.components.get(componentId);
        if (!component) {
            throw new ComponentNotFoundError(componentId);
        }
        if (component.getScope() === 1 /* PROTOTYPE */) {
            return _.cloneDeep(component.getEntityInstance());
        }
        return component.getEntityInstance();
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
 * Class that validates component's instance
 */

/**
 * Class that responds for lifecycle's validation of the component
 */
var LifecycleValidator = (function () {
    function LifecycleValidator() {
    }
    /**
     * Function that checks if lifecycle exists in meta-data
     * from configuration file which describes possible component
     * @param {Object} component parsed object from meta-data
     * @returns {boolean} result of check
     */
    LifecycleValidator.lifecycleExistsInConfiguration = function (component) {
        return !util.isUndefined(component) && !util.isUndefined(component['lifecycle']) && util.isObject(component['lifecycle']);
    };
    /**
     * Function that validates function from component's lifecycle
     * @param method function from component's lifecycle
     * @returns {boolean} result of the validation
     */
    LifecycleValidator.validateMethod = function (method) {
        return !util.isUndefined(method) && util.isFunction(method);
    };
    /**
     * Function that returns descriptor of lifecycle's methods
     * @param entity custom class instance
     * @param component parsed object from the metadata
     * @returns {{}} lifecycleMethodsDescriptor descriptor that has methods' names as keys and
     * functions as values
     */
    LifecycleValidator.getLifecycleMethodsDesriptor = function (entity, component) {
        var lifecycleMethodsDescriptor = {};
        Object.keys(component['lifecycle']).forEach(function (key) {
            var method = entity[component['lifecycle'][key]];
            lifecycleMethodsDescriptor[key] = (LifecycleValidator.validateMethod(method)) ? method : null;
        });
        return lifecycleMethodsDescriptor;
    };
    /**
     * Function that validates the whole lifecycle instance of the possible component
     * @param currentContext current application context
     * @param {Object} entity custom class instance
     * @param {Object} component parsed object from the metadata
     */
    LifecycleValidator.validateLifecycle = function (currentContext, entity, component) {
        var lifecycle = new ComponentLifecycle(component['id']);
        if (LifecycleValidator.lifecycleExistsInConfiguration(component)) {
            var lifecycleMethodsDescriptor = LifecycleValidator.getLifecycleMethodsDesriptor(entity, component);
            lifecycle.setLifecycleMethods(lifecycleMethodsDescriptor);
        }
        currentContext.getContextLifecycle().getComponentLifecycles().set(component['id'], lifecycle);
    };
    return LifecycleValidator;
}());

/**
 * Class that responds for validation component's properties
 */
var PropertyValidator = (function () {
    function PropertyValidator() {
    }
    /**
     * Function that validates property's name
     * @param {Object} property of the component
     * @returns {boolean} validation result
     */
    PropertyValidator.validateName = function (property) {
        return property['name'] != null && util.isString(property['name']);
    };
    /**
     * Function that validates property's value
     * @param {Object} property of the component
     * @returns {boolean} validation result
     */
    PropertyValidator.validateValue = function (property) {
        return property['value'] != null;
    };
    /**
     * Function that validates property's reference
     * @param {Object} property of the component
     * @returns {boolean} validation result
     */
    PropertyValidator.validateReference = function (property) {
        return property['reference'] != null && util.isObject(property['reference']);
    };
    /**
     * Function that validates all properties of the component
     * @param {Object[]} properties of the component
     * @returns {boolean} validation result
     */
    PropertyValidator.validateProperties = function (properties) {
        properties.forEach(function (property) {
            if (!property['value']) {
                if (!PropertyValidator.validateName(property) ||
                    !PropertyValidator.validateReference(property)) {
                    return false;
                }
            }
            else if (property['value']) {
                if (!PropertyValidator.validateName(property) ||
                    !PropertyValidator.validateValue(property)) {
                    return false;
                }
            }
        });
        return true;
    };
    return PropertyValidator;
}());

/**
 * Class that validates all context's processes
 * (initialization, component's management mechanism, close)
 */

/**
 * Class of error that describes situation when metadata validation
 * from configuration files was failed
 */
var MetadataValidationError = (function (_super) {
    __extends(MetadataValidationError, _super);
    function MetadataValidationError(pathToConfigurationFile) {
        var _this = this;
        var message = "Metadata validation was failed in file \"" + pathToConfigurationFile + "\".";
        _this = _super.call(this, message) || this;
        _this.name = 'MetadataValidationError';
        return _this;
    }
    return MetadataValidationError;
}(Error));

var jsonfile$1 = require('jsonfile');
var path = require('path');
var fs = require('fs');
/**
 * Length of property's object
 * @type {number}
 */
var PROPERTY_LENGTH = 2;
/**
 * Class that responds for validation of metadata from
 * all configuration files context should receive
 */
var MetadataValidator = (function () {
    function MetadataValidator() {
    }
    /**
     * Method that validates configuration files' existence
     * and their format as JSON
     * @param paths
     * @returns {Array} of parsed objects from metadata
     */
    MetadataValidator.validateConfigurationFiles = function (paths) {
        var configFilesContent = [];
        paths.forEach(function (path) {
            try {
                fs.statSync(path);
                LOGGER.debug("[Metadata Validation]: Configuration file by path \"" + path + "\" was found");
                configFilesContent.push({ path: path, content: jsonfile$1.readFileSync(path) });
            }
            catch (err) {
                LOGGER.error("[Metadata Validation]: Cannot read the file by the following path: \"" + path + "\".");
            }
        });
        return configFilesContent;
    };
    /**
     * Method that validates parsed objects from metadata
     * according to the library's specification
     * @param configFilesContent parsed content from metadata
     * @returns {Array} configuration objects (special objects
     * on the highest level of the metadata hierarchy)
     */
    MetadataValidator.validateConfigurationObjects = function (configFilesContent) {
        var configuratioObjects = [];
        configFilesContent.forEach(function (file) {
            var configurationObject = file['content']['configuration'];
            if (!configurationObject) {
                LOGGER.error("[Metadata Validation]: Configuration object from metadata in file \"" + file['path'] + "\" does not exist");
                throw new MetadataValidationError(file['path']);
            }
            configuratioObjects.push({ filePath: file['path'], configuration: configurationObject });
        });
        return configuratioObjects;
    };
    /**
     * Method that validates arrays of possible components
     * @param configurationObjects special objects
     * on the highest level of the metadata hierarchy
     */
    MetadataValidator.validateComponentsArray = function (configurationObjects) {
        var componentsArrays = [];
        configurationObjects.forEach(function (configObj) {
            var componentsArray = configObj['configuration']['components'];
            if (!componentsArray) {
                LOGGER.error("[Metadata Validation]: Components' array from metadata in file \"" + configObj['filePath'] + "\" does not exist");
                throw new MetadataValidationError(configObj['filePath']);
            }
            var componentsArrayDescriptor = { filePath: configObj['filePath'], components: componentsArray };
            MetadataValidator.validateConfigComponent(componentsArrayDescriptor);
        });
    };
    /**
     * Method that validates the object instance of possible component
     * @param componentsArrayDescriptor descriptor of an array of possible components
     * that stores information about its content and the path to the configuration file
     */
    MetadataValidator.validateConfigComponent = function (componentsArrayDescriptor) {
        componentsArrayDescriptor['components'].forEach(function (comp, index) {
            if (!util.isObject(comp)) {
                LOGGER.error("[Metadata Validation]: Component[" + index + "] from metadata in file \"" + componentsArrayDescriptor['filePath'] + "\" is not an object");
                throw new MetadataValidationError(componentsArrayDescriptor['filePath']);
            }
            var componentDescriptor = { index: index, instance: comp, filePath: componentsArrayDescriptor['filePath'] };
            MetadataValidator.validateConfigLifecycle(componentDescriptor);
            MetadataValidator.validateConfigScope(componentDescriptor);
            MetadataValidator.validateConfigProperties(componentDescriptor);
        });
    };
    /**
     * Method that validates the existence of lifecycle's method in the lifecycle object
     * @param lifecycle object
     * @param methodName name of method
     * @returns {boolean} validation result
     */
    MetadataValidator.configLifecycleHasMethod = function (lifecycle, methodName) {
        return lifecycle.hasOwnProperty(methodName) && util.isString(lifecycle[methodName]);
    };
    /**
     * Method that validated lifecycle object according to the library's specification
     * @param componentDescriptor descriptor that stores information about
     * component object's position in the array of possible components, its instance and
     * path to the configuration file
     */
    MetadataValidator.validateConfigLifecycle = function (componentDescriptor) {
        var configLifecycle = componentDescriptor['instance']['lifecycle'];
        if (!configLifecycle) {
            LOGGER.warn("[Metadata Validation]: Component[" + componentDescriptor['index'] + "] from metadata in file \"" + componentDescriptor['filePath'] + "\" has no lifecycle object");
        }
        else {
            if (!util.isObject(configLifecycle)) {
                LOGGER.error("[Metadata Validation]: Component[" + componentDescriptor['index'] + "] from metadata in file \"" + componentDescriptor['filePath'] + "\" has invalid lifecycle object");
                throw new MetadataValidationError(componentDescriptor['filePath']);
            }
            var lifecycleMethods = Object.keys(configLifecycle);
            lifecycleMethods.forEach(function (method) {
                var methodExists = MetadataValidator.configLifecycleHasMethod(configLifecycle, method);
                if (!methodExists) {
                    LOGGER.error("[Metadata Validation]: Component[" + componentDescriptor['index'] + "] from metadata in file \"" + componentDescriptor['filePath'] + "\" has invalid lifecycle object");
                    throw new MetadataValidationError(componentDescriptor['filePath']);
                }
            });
            LOGGER.debug("[Metadata Validation]: Lifecycle of the Component[" + componentDescriptor['index'] + "] from metadata in file \"" + componentDescriptor['filePath'] + "\" is successfully validated");
        }
    };
    /**
     * Method that validates property object's name existence and type
     * @param property object
     * @returns {boolean|Object} validation result
     */
    MetadataValidator.configPropertyHasName = function (property) {
        return property.hasOwnProperty('name') && util.isString(property['name']);
    };
    /**
     * Method that validates property object's value existence and type
     * @param property object
     * @returns {boolean|Object} validation result
     */
    MetadataValidator.configPropertyHasValue = function (property) {
        return property.hasOwnProperty('value') && !util.isNullOrUndefined(property['value']);
    };
    /**
     * Method that validates property object's reference existence and type
     * @param property object
     * @returns {boolean|Object} validation result
     */
    MetadataValidator.configPropertyHasReference = function (property) {
        return property.hasOwnProperty('reference') && util.isString(property['reference']);
    };
    /**
     * Method that validated properties' array according to the library's specification
     * @param componentDescriptor descriptor that stores information about
     * component object's position in the array of possible components, its instance and
     * path to the configuration file
     */
    MetadataValidator.validateConfigProperties = function (componentDescriptor) {
        var configProperties = componentDescriptor['instance']['properties'];
        if (!util.isArray(configProperties)) {
            LOGGER.error("[Metadata Validation]: Component[" + componentDescriptor['index'] + "] from metadata in file \"" + componentDescriptor['filePath'] + "\"has invalid properties' instance");
            throw new MetadataValidationError(componentDescriptor['filePath']);
        }
        configProperties.forEach(function (prop) {
            if (Object.keys(prop).length === PROPERTY_LENGTH && MetadataValidator.configPropertyHasName(prop)) {
                if (MetadataValidator.configPropertyHasValue(prop) || MetadataValidator.configPropertyHasReference(prop)) {
                    LOGGER.debug("[Metadata Validation]: Property \"" + prop['name'] + "\" of the Component[" + componentDescriptor['index'] + "] from metadata in file \"" + componentDescriptor['filePath'] + " is successfully validated");
                }
                else {
                    LOGGER.error("[Metadata Validation]: Component[" + componentDescriptor['index'] + "] from metadata in file \"" + componentDescriptor['filePath'] + " has invalid property \"" + prop['name'] + "\"");
                    throw new MetadataValidationError(componentDescriptor['filePath']);
                }
            }
        });
    };
    /**
     * Method that validated properties' scope according to the library's specification
     * @param componentDescriptor descriptor that stores information about
     * component object's position in the array of possible components, its instance and
     * path to the configuration file
     */
    MetadataValidator.validateConfigScope = function (componentDescriptor) {
        var configScope = componentDescriptor['instance']['scope'];
        if (configScope) {
            if (!util.isString(configScope) || !['singleton', 'prototype'].includes(configScope)) {
                LOGGER.error("[Metadata Validation]: Component[" + componentDescriptor['index'] + "] from metadata in file \"" + componentDescriptor['filePath'] + "\" has invalid scope");
                throw new MetadataValidationError(componentDescriptor['filePath']);
            }
            else {
                LOGGER.debug("[Metadata Validation]: Scope of the Component[" + componentDescriptor['index'] + "] from metadata in file \"" + componentDescriptor['filePath'] + " is successfully validated");
            }
        }
        else {
            LOGGER.debug("[Metadata Validation]: Scope of the Component[" + componentDescriptor['index'] + "] from metadata in file \"" + componentDescriptor['filePath'] + "\" will be set to SINGLETON as default");
        }
    };
    /**
     * Main method that validates all metadata from configuration files
     * @param paths to the configuration files
     */
    MetadataValidator.validateMetadata = function (paths) {
        LOGGER.info('[Metadata Validation]: Metadata validation process is starting...');
        var configFilesContent = MetadataValidator.validateConfigurationFiles(paths);
        var configurationKeywords = MetadataValidator.validateConfigurationObjects(configFilesContent);
        MetadataValidator.validateComponentsArray(configurationKeywords);
        LOGGER.info('[Metadata Validation]: Metadata validation process was finished...');
    };
    return MetadataValidator;
}());

/**
 * Class of error that describes situation
 * when property's validation was failed
 */
var PropertyValidationError = (function (_super) {
    __extends(PropertyValidationError, _super);
    function PropertyValidationError(componentId) {
        var _this = this;
        var message = "Component with id \"" + componentId + "\" contains wrong property.";
        _this = _super.call(this, message) || this;
        _this.name = 'PropertyValidationError';
        return _this;
    }
    return PropertyValidationError;
}(Error));

var jsonfile = require('jsonfile');
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
            MetadataValidator.validateMetadata(configs);
            _this.configs = configs;
            _this.registerComponentsInContext();
            LOGGER.info('[MetadataContext]: Context was initialized');
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
     * (without values, without references)
     */
    MetadataContext.prototype.setBasicPropertiesToComponents = function (configComponents) {
        var _this = this;
        configComponents.forEach(function (configComp) {
            var classPath = APPLICATION_ROOT_DIRECTORY + "/" + configComp['classPath'];
            var entityClass = require(classPath);
            var entityPrototype = entityClass.default.prototype;
            var entity = Object.create(entityPrototype);
            LifecycleValidator.validateLifecycle(_this, entityPrototype, configComp);
            var componentLifecycle = _this.getContextLifecycle().getComponentLifecycles().get(configComp['id']);
            componentLifecycle.callPreInitMethod();
            var component = new Component(configComp['id'], configComp['name'], configComp['classPath'], _this.defineComponentScope(configComp));
            var properties = _this.getPropertiesFromConfiguration(configComp, entityClass);
            var propertiesAreValid = PropertyValidator.validateProperties(properties);
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
                _this.components.set(configComp['id'], component);
                componentLifecycle.callPostInitMethod();
            }
            else {
                throw new PropertyValidationError(configComp['id']);
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
            var entityClass = require(APPLICATION_ROOT_DIRECTORY + "/" + component.getClassPath());
            configComponents.forEach(function (comp) {
                var properties = _this.getPropertiesFromConfiguration(comp, entityClass);
                properties.forEach(function (prop) {
                    if (prop['reference']) {
                        var injectedComponent = _this.getComponentEntityInstance(prop['reference']);
                        component.getEntityInstance()[prop['name']] = injectedComponent;
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
        this.setBasicPropertiesToComponents(configComponents);
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
}(Context));

/**
 * Class that responds for creation and management process of the components,
 * for updating and closing application context in safe-mode,
 * simple representation of Inversion of Control Container based on decorating
 * js-classes, methods and properties
 */
var DecoratorContext$$1 = (function (_super) {
    __extends(DecoratorContext$$1, _super);
    function DecoratorContext$$1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DecoratorContext$$1;
}(Context));

exports.MetadataContext = MetadataContext;
exports.DecoratorContext = DecoratorContext$$1;
