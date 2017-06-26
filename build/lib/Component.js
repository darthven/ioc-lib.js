"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Component = (function () {
    function Component(id, name, classPath, scope, lifecycle) {
        this.id = id;
        this.name = name;
        this.classPath = classPath;
        this.scope = scope;
        this.lifecycle = lifecycle;
    }
    Component.prototype.getId = function () {
        return this.id;
    };
    Component.prototype.setId = function (id) {
        this.id = id;
    };
    Component.prototype.getName = function () {
        return this.name;
    };
    Component.prototype.setName = function (name) {
        this.name = name;
    };
    Component.prototype.getProperties = function () {
        return this.properties;
    };
    Component.prototype.setProperties = function (properties) {
        this.properties = properties;
    };
    Component.prototype.getClassPath = function () {
        return this.classPath;
    };
    Component.prototype.setClassPath = function (classPath) {
        this.classPath = classPath;
    };
    Component.prototype.getScope = function () {
        return this.scope;
    };
    Component.prototype.setScope = function (scope) {
        this.scope = scope;
    };
    Component.prototype.getLifecycle = function () {
        return this.lifecycle;
    };
    Component.prototype.setLifecycle = function (lifecycle) {
        this.lifecycle = lifecycle;
    };
    return Component;
}());
exports.default = Component;
