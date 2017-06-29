"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class that represents any entity marked as class in the custom application
 * in the application context and allows you to inject other entities to itself
 * according to Dependency Injection mechanism.
 */
var Component = (function () {
    /**
     * Component's constructor
     * @param id unique identifier
     * @param name of the component
     * @param classPath path to the class of the entity
     * @param scope of the component
     * @param lifecycle of the component
     */
    function Component(id, name, classPath, scope, lifecycle) {
        this.id = id;
        this.name = name;
        this.classPath = classPath;
        this.scope = scope;
        this.lifecycle = lifecycle;
    }
    /**
     *
     * @returns {string}
     */
    Component.prototype.getId = function () {
        return this.id;
    };
    /**
     *
     * @param {string} id
     */
    Component.prototype.setId = function (id) {
        this.id = id;
    };
    /**
     *
     * @returns {string}
     */
    Component.prototype.getName = function () {
        return this.name;
    };
    /**
     *
     * @param name
     */
    Component.prototype.setName = function (name) {
        this.name = name;
    };
    /**
     *
     * @returns {Property[]}
     */
    Component.prototype.getProperties = function () {
        return this.properties;
    };
    /**
     *
     * @param properties
     */
    Component.prototype.setProperties = function (properties) {
        this.properties = properties;
    };
    /**
     *
     * @returns {string}
     */
    Component.prototype.getClassPath = function () {
        return this.classPath;
    };
    /**
     *
     * @param classPath
     */
    Component.prototype.setClassPath = function (classPath) {
        this.classPath = classPath;
    };
    /**
     *
     * @returns {Scope}
     */
    Component.prototype.getScope = function () {
        return this.scope;
    };
    /**
     *
     * @param scope
     */
    Component.prototype.setScope = function (scope) {
        this.scope = scope;
    };
    /**
     *
     * @returns {ComponentLifecycle}
     */
    Component.prototype.getLifecycle = function () {
        return this.lifecycle;
    };
    /**
     *
     * @param lifecycle
     */
    Component.prototype.setLifecycle = function (lifecycle) {
        this.lifecycle = lifecycle;
    };
    return Component;
}());
exports.default = Component;
