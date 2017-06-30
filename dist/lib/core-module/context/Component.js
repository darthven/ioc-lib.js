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
     * Function that returns component's unique identifier
     * @returns {string} unique identifier
     */
    Component.prototype.getId = function () {
        return this.id;
    };
    /**
     * Function that sets unique identifier to the component
     * @param {string} id
     */
    Component.prototype.setId = function (id) {
        this.id = id;
    };
    /**
     * Function that returns component's name
     * @returns {string} name of the component
     */
    Component.prototype.getName = function () {
        return this.name;
    };
    /**
     * Function that sets name to the component
     * @param name
     */
    Component.prototype.setName = function (name) {
        this.name = name;
    };
    /**
     * Function that returns component's properties
     * @returns {Property[]} properties of the component
     */
    Component.prototype.getProperties = function () {
        return this.properties;
    };
    /**
     * Function that set properties to the component
     * @param properties
     */
    Component.prototype.setProperties = function (properties) {
        this.properties = properties;
    };
    /**
     * Function that returns path to the class of component's entity
     * @returns {string} path to the class
     */
    Component.prototype.getClassPath = function () {
        return this.classPath;
    };
    /**
     * Function that sets the path to the class of component's entity
     * @param {string} classPath
     */
    Component.prototype.setClassPath = function (classPath) {
        this.classPath = classPath;
    };
    /**
     * Function that returns scope of the component
     * @returns {Scope} component's scope
     */
    Component.prototype.getScope = function () {
        return this.scope;
    };
    /**
     * Function that sets the scope to the component
     * @param scope
     */
    Component.prototype.setScope = function (scope) {
        this.scope = scope;
    };
    /**
     * Function that returns lifecycle instance of the component
     * @returns {ComponentLifecycle} lifecycle of the component
     */
    Component.prototype.getLifecycle = function () {
        return this.lifecycle;
    };
    /**
     * Function that sets lifecycle instance to the component
     * @param lifecycle
     */
    Component.prototype.setLifecycle = function (lifecycle) {
        this.lifecycle = lifecycle;
    };
    return Component;
}());
exports.default = Component;
