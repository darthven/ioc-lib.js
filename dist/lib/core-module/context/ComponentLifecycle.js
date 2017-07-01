"use strict";
/**
 * Class that is responsive for the components' lifecycle
 * management in the application context.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentLifecycle = (function () {
    function ComponentLifecycle() {
    }
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
     * Function that executes init-method of the component
     */
    ComponentLifecycle.prototype.callInitMethod = function () {
        this.initMethod();
        ComponentLifecycle.logger.debug("Component with id \"" + this.getComponentId() + "\" was initialized");
    };
    /**
     * Function that sets init-method of the component to its lifecycle
     * @param {Function} initMethod is called before the initialization of the component
     */
    ComponentLifecycle.prototype.setInitMethod = function (initMethod) {
        this.initMethod = initMethod;
    };
    /**
     * Function that is executed after setting all properties of the component
     */
    ComponentLifecycle.prototype.callAfterPropertiesWereSetMethod = function () {
        this.afterPropertiesWereSetMethod();
        ComponentLifecycle.logger.debug("Component with id \"" + this.getComponentId() + "\" received its properties");
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
    ComponentLifecycle.prototype.callDestroyMethod = function () {
        this.destroyMethod();
        ComponentLifecycle.logger.debug("Component with id \"" + this.getComponentId() + "\" was destroyed");
    };
    /**
     * Function that sets method that will be executed before setting
     *  removing component from the application context to its lifecycle
     * @param {Function} destroyMethod is called before removing component from the application context
     */
    ComponentLifecycle.prototype.setDestroyMethod = function (destroyMethod) {
        this.destroyMethod = destroyMethod;
    };
    return ComponentLifecycle;
}());
/**
 * Logger for logging all important events during components' existence
 */
ComponentLifecycle.logger = require('log4js').getLogger();
exports.default = ComponentLifecycle;
