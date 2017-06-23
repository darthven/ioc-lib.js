"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentLifecycle = (function () {
    function ComponentLifecycle() {
    }
    ComponentLifecycle.prototype.getComponentId = function () {
        return this.componentId;
    };
    ComponentLifecycle.prototype.setComponentId = function (value) {
        this.componentId = value;
    };
    ComponentLifecycle.prototype.callInitMethod = function (component) {
        this.initMethod();
        console.log("Component with id \"" + this.getComponentId() + "\" was initialized");
    };
    ComponentLifecycle.prototype.setInitMethod = function (initMethod) {
        this.initMethod = initMethod;
    };
    ComponentLifecycle.prototype.callAfterPropertiesWereSetMethod = function (component) {
        this.afterPropertiesWereSetMethod();
        console.log("Component with id \"" + this.getComponentId() + "\" received its properties");
    };
    ComponentLifecycle.prototype.setAfterPropertiesWereSetMethod = function (afterPropertiesWereSetMethod) {
        this.afterPropertiesWereSetMethod = afterPropertiesWereSetMethod;
    };
    ComponentLifecycle.prototype.callDestroyMethod = function (component) {
        this.destroyMethod();
        console.log("Component with id \"" + this.getComponentId() + "\" was destroyed");
    };
    ComponentLifecycle.prototype.setDestroyMethod = function (destroyMethod) {
        this.destroyMethod = destroyMethod;
    };
    return ComponentLifecycle;
}());
exports.default = ComponentLifecycle;
