"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("util");
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
            function () { return ComponentLifecycle.logger.info("Default pre-init-method is called to the component with id \"" + _this.componentId + "\""); };
        this.postInitMethod =
            function () { return ComponentLifecycle.logger.info("Default post-init-method is called to the component with id \"" + _this.componentId + "\""); };
        this.beforePropertiesWereSetMethod =
            function () { return ComponentLifecycle.logger.info("Default before-properties-were-set-method is called to the component with id \"" + _this.componentId + "\""); };
        this.afterPropertiesWereSetMethod =
            function () { return ComponentLifecycle.logger.info("Default after-properties-were-set-method is called to the component with id \"" + _this.componentId + "\""); };
        this.preDestroyMethod =
            function () { return ComponentLifecycle.logger.info("Default pre-destroy-method is called to the component with id \"" + _this.componentId + "\""); };
        this.postDestroyMethod =
            function () { return ComponentLifecycle.logger.info("Default post-destroy-method is called to the component with id \"" + _this.componentId + "\""); };
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
        ComponentLifecycle.logger.debug("Component Lifecycle: Before Component with id \"" + this.getComponentId() + "\" will be initialized");
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
        ComponentLifecycle.logger.debug("Component Lifecycle: After Component with id \"" + this.getComponentId() + "\" was initialized");
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
     * Function that is executed after setting all properties of the component
     */
    ComponentLifecycle.prototype.callBeforePropertiesWereSetMethod = function () {
        ComponentLifecycle.logger.debug("Component Lifecycle: Before Component with id \"" + this.getComponentId() + "\" will receive its properties");
        this.beforePropertiesWereSetMethod();
    };
    /**
     * Function that sets method that will be executed before setting
     * all properties of the component to its lifecycle
     * @param {Function} beforePropertiesWereSetMethod is called before setting
     * all properties to the component
     */
    ComponentLifecycle.prototype.setBeforePropertiesWereSetMethod = function (beforePropertiesWereSetMethod) {
        this.beforePropertiesWereSetMethod = beforePropertiesWereSetMethod;
    };
    /**
     * Function that is executed after setting all properties of the component
     */
    ComponentLifecycle.prototype.callAfterPropertiesWereSetMethod = function () {
        ComponentLifecycle.logger.debug("Component Lifecycle: After Component with id \"" + this.getComponentId() + "\" received its properties");
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
        ComponentLifecycle.logger.debug("Component Lifecycle: Before Component with id \"" + this.getComponentId() + "\" will be destroyed");
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
        ComponentLifecycle.logger.debug("Component Lifecycle: After Component with id \"" + this.getComponentId() + "\" was destroyed");
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
            if (_this[methodName] && !util_1.isNull(lifecycleMethodsDescriptor[methodName])) {
                _this[methodName] = lifecycleMethodsDescriptor[methodName];
            }
        });
    };
    /**
     * Logger for logging all important events during components' existence
     */
    ComponentLifecycle.logger = require('log4js').getLogger();
    return ComponentLifecycle;
}());
exports.default = ComponentLifecycle;
