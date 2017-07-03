"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("util");
var core_module_1 = require("../../core-module/core-module");
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
        return !util_1.isUndefined(component) && !util_1.isUndefined(component['lifecycle']) && util_1.isObject(component['lifecycle']);
    };
    /**
     * Function that validates init-method from meta-data
     * @param initMethod method that will be called before
     * component's registration in the application context
     * @returns {boolean} result of the validation
     */
    LifecycleValidator.validateInitMethod = function (initMethod) {
        return !util_1.isUndefined(initMethod) && util_1.isFunction(initMethod);
    };
    /**
     * Function that validates method which will be call after setting
     * all properties to the possible component from meta-data
     * @param afterPropertiesWereSetMethod method that will be called after
     * all properties to the possible component from meta-data
     * @returns {boolean} result of the validation
     */
    LifecycleValidator.validateAfterPropertiesWereSetMethod = function (afterPropertiesWereSetMethod) {
        return !util_1.isUndefined(afterPropertiesWereSetMethod) && util_1.isFunction(afterPropertiesWereSetMethod);
    };
    /**
     * Function that validates destroy-method from meta-data
     * @param destroyMethod method that will be called before
     * removing component from the application context
     * @returns {boolean} result of the validation
     */
    LifecycleValidator.validateDestroyMethod = function (destroyMethod) {
        return !util_1.isUndefined(destroyMethod) && util_1.isFunction(destroyMethod);
    };
    /**
     * Function that sets default library's init-method
     * to the lifecycle instance of the component
     * @param {ComponentLifecycle} lifecycle's instance of the component
     * @param {Object} component parsed object from the meta-data
     */
    LifecycleValidator.setDafaultInitMethod = function (lifecycle, component) {
        LifecycleValidator.logger.warn("No init-method was detected in component with id \"" + component['id'] + "\"");
        lifecycle.setInitMethod(function () {
            LifecycleValidator.logger.debug("Default init-method is called to the component with id \"" + component['id'] + "\"");
        });
    };
    /**
     * Function that sets default library's after-properties-were-set-method
     * to the lifecycle instance of the component
     * @param {ComponentLifecycle} lifecycle's instance of the component
     * @param {Object} component parsed object from the meta-data
     */
    LifecycleValidator.setDefaultAfterPropertiesWereSetMethod = function (lifecycle, component) {
        LifecycleValidator.logger.warn("No after-properties-set-method was detected in component with id \"" + component['id'] + "\"");
        lifecycle.setAfterPropertiesWereSetMethod(function () {
            LifecycleValidator.logger.debug("Default after-properties-set-method is called to the component with id \"" + component['id'] + "\"");
        });
    };
    /**
     * Function that sets default library's destroy-method
     * to the lifecycle instance of the component
     * @param {ComponentLifecycle} lifecycle's instance of the component
     * @param {Object} component parsed object from the meta-data
     */
    LifecycleValidator.setDafaultDestroyMethod = function (lifecycle, component) {
        LifecycleValidator.logger.warn("No  destroy-method  was detected in component with id \"" + component['id'] + "\"");
        lifecycle.setDestroyMethod(function () {
            LifecycleValidator.logger.debug("Default destroy-method is called to the component with id \"" + component['id'] + "\"");
        });
    };
    /**
     * Function that validates the whole lifecycle instance
     * of the possible component
     * @param {Object} entity custom class instance
     * @param {Object} component parsed object from the meta-data
     * @returns {ComponentLifecycle} lifecycle's instance of the component
     */
    LifecycleValidator.validateLifecycle = function (entity, component) {
        var initMethod, afterPropertiesWereSetMethod, destroyMethod;
        var lifecycle = new core_module_1.ComponentLifecycle();
        lifecycle.setComponentId(component['id']);
        if (LifecycleValidator.lifecycleExistsInConfiguration(component)) {
            initMethod = entity[component['lifecycle'].initMethod];
            afterPropertiesWereSetMethod = entity[component['lifecycle'].afterPropertiesWereSetMethod];
            destroyMethod = entity[component['lifecycle'].destroyMethod];
            if (!LifecycleValidator.validateInitMethod(initMethod)) {
                LifecycleValidator.setDafaultInitMethod(lifecycle, component);
            }
            else {
                lifecycle.setInitMethod(initMethod);
            }
            if (!LifecycleValidator.validateAfterPropertiesWereSetMethod(afterPropertiesWereSetMethod)) {
                LifecycleValidator.setDefaultAfterPropertiesWereSetMethod(lifecycle, component);
            }
            else {
                lifecycle.setAfterPropertiesWereSetMethod(afterPropertiesWereSetMethod);
            }
            if (!LifecycleValidator.validateDestroyMethod(destroyMethod)) {
                LifecycleValidator.setDafaultDestroyMethod(lifecycle, component);
            }
            else {
                lifecycle.setDestroyMethod(destroyMethod);
            }
        }
        else {
            LifecycleValidator.setDafaultInitMethod(lifecycle, component);
            LifecycleValidator.setDefaultAfterPropertiesWereSetMethod(lifecycle, component);
            LifecycleValidator.setDafaultDestroyMethod(lifecycle, component);
        }
        return lifecycle;
    };
    /**
     * Logger for logging all events during lifecycle's validation process
     */
    LifecycleValidator.logger = require('log4js').getLogger();
    return LifecycleValidator;
}());
exports.default = LifecycleValidator;
