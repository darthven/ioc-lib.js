"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentLifecycle = (function () {
    function ComponentLifecycle() {
    }
    ComponentLifecycle.prototype.callInitMethod = function () {
        this.initMethod();
    };
    ComponentLifecycle.prototype.setInitMethod = function (initMethod) {
        this.initMethod = initMethod;
    };
    ComponentLifecycle.prototype.callAfterPropertiesWereSetMethod = function () {
        this.afterPropertiesWereSetMethod();
    };
    ComponentLifecycle.prototype.setAfterPropertiesWereSetMethod = function (afterPropertiesWereSetMethod) {
        this.afterPropertiesWereSetMethod = afterPropertiesWereSetMethod;
    };
    ComponentLifecycle.prototype.getDestroyMethod = function () {
        if (this.destroyMethod) {
            return this.destroyMethod;
        }
        return null;
    };
    ComponentLifecycle.prototype.setDestroyMethod = function (destroyMethod) {
        this.destroyMethod = destroyMethod;
    };
    return ComponentLifecycle;
}());
exports.default = ComponentLifecycle;
