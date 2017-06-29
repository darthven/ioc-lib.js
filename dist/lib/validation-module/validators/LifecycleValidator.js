"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("util");
var ComponentLifecycle_1 = require("../../core-module/context/ComponentLifecycle");
/**
 * Created by kokh0716 on 6/26/2017.
 */
var LifecycleValidator = (function () {
    function LifecycleValidator() {
    }
    LifecycleValidator.lifecycleExistsInConfiguration = function (component) {
        return !util_1.isUndefined(component) && !util_1.isUndefined(component['lifecycle']) && util_1.isObject(component['lifecycle']);
    };
    LifecycleValidator.validateInitMethod = function (initMethod) {
        return !util_1.isUndefined(initMethod) && util_1.isFunction(initMethod);
    };
    LifecycleValidator.validateAfterPropertiesWereSetMethod = function (afterPropertiesWereSetMethod) {
        return !util_1.isUndefined(afterPropertiesWereSetMethod) && util_1.isFunction(afterPropertiesWereSetMethod);
    };
    LifecycleValidator.validateDestroyMethod = function (destroyMethod) {
        return !util_1.isUndefined(destroyMethod) && util_1.isFunction(destroyMethod);
    };
    LifecycleValidator.setDafaultInitMethod = function (lifecycle, component) {
        LifecycleValidator.logger.warn("No init-method was detected in component with id \"" + component['id'] + "\"");
        lifecycle.setInitMethod(function () {
            LifecycleValidator.logger.debug("Default init-method is called to the component with id \"" + component['id'] + "\"");
        });
    };
    LifecycleValidator.setDefaultAfterPropertiesWereSetMethod = function (lifecycle, component) {
        LifecycleValidator.logger.warn("No after-properties-set-method was detected in component with id \"" + component['id'] + "\"");
        lifecycle.setAfterPropertiesWereSetMethod(function () {
            LifecycleValidator.logger.debug("Default after-properties-set-method is called to the component with id \"" + component['id'] + "\"");
        });
    };
    LifecycleValidator.setDafaultDestroyMethod = function (lifecycle, component) {
        LifecycleValidator.logger.warn("No  destroy-method  was detected in component with id \"" + component['id'] + "\"");
        lifecycle.setDestroyMethod(function () {
            LifecycleValidator.logger.debug("Default destroy-method is called to the component with id \"" + component['id'] + "\"");
        });
    };
    LifecycleValidator.validateLifecycle = function (entity, component) {
        var initMethod, afterPropertiesWereSetMethod, destroyMethod;
        var lifecycle = new ComponentLifecycle_1.default();
        lifecycle.setComponentId(component['id']);
        if (this.lifecycleExistsInConfiguration(component)) {
            initMethod = entity[component['lifecycle'].initMethod];
            afterPropertiesWereSetMethod = entity[component['lifecycle'].afterPropertiesWereSetMethod];
            destroyMethod = entity[component['lifecycle'].destroyMethod];
            if (!this.validateInitMethod(initMethod)) {
                this.setDafaultInitMethod(lifecycle, component);
            }
            else {
                lifecycle.setInitMethod(initMethod);
            }
            if (!this.validateAfterPropertiesWereSetMethod(afterPropertiesWereSetMethod)) {
                this.setDefaultAfterPropertiesWereSetMethod(lifecycle, component);
            }
            else {
                lifecycle.setAfterPropertiesWereSetMethod(afterPropertiesWereSetMethod);
            }
            if (!this.validateDestroyMethod(destroyMethod)) {
                this.setDafaultDestroyMethod(lifecycle, component);
            }
            else {
                lifecycle.setDestroyMethod(destroyMethod);
            }
        }
        else {
            this.setDafaultInitMethod(lifecycle, component);
            this.setDefaultAfterPropertiesWereSetMethod(lifecycle, component);
            this.setDafaultDestroyMethod(lifecycle, component);
        }
        return lifecycle;
    };
    return LifecycleValidator;
}());
LifecycleValidator.logger = require('log4js').getLogger();
exports.default = LifecycleValidator;
