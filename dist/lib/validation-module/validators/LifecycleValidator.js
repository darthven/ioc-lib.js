"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("util");
var ComponentLifecycle_1 = require("../../core-module/context/ComponentLifecycle");
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
     * Function that validates function from component's lifecycle
     * @param method function from component's lifecycle
     * @returns {boolean} result of the validation
     */
    LifecycleValidator.validateMethod = function (method) {
        return !util_1.isUndefined(method) && util_1.isFunction(method);
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
        var lifecycle = new ComponentLifecycle_1.default(component['id']);
        if (LifecycleValidator.lifecycleExistsInConfiguration(component)) {
            var lifecycleMethodsDescriptor = LifecycleValidator.getLifecycleMethodsDesriptor(entity, component);
            lifecycle.setLifecycleMethods(lifecycleMethodsDescriptor);
        }
        currentContext.getContextLifecycle().getComponentLifecycles().set(component['id'], lifecycle);
    };
    return LifecycleValidator;
}());
exports.default = LifecycleValidator;
