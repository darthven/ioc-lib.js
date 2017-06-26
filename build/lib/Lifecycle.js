"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Lifecycle = (function () {
    function Lifecycle() {
    }
    Lifecycle.prototype.callInitMethod = function () {
        this.initMethod();
    };
    Lifecycle.prototype.setInitMethod = function (initMethod) {
        this.initMethod = initMethod;
    };
    Lifecycle.prototype.callAfterPropertiesWereSetMethod = function () {
        this.afterPropertiesWereSetMethod();
    };
    Lifecycle.prototype.setAfterPropertiesWereSetMethod = function (afterPropertiesWereSetMethod) {
        this.afterPropertiesWereSetMethod = afterPropertiesWereSetMethod;
    };
    Lifecycle.prototype.callDestroyMethod = function () {
        this.destroyMethod();
    };
    Lifecycle.prototype.setDestroyMethod = function (destroyMethod) {
        this.destroyMethod = destroyMethod;
    };
    return Lifecycle;
}());
exports.default = Lifecycle;
