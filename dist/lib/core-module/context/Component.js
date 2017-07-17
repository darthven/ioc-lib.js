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
     * @param componentName of the component
     * @param classPath path to the class of the entity
     * @param scope of the component
     * @param lifecycle of the component
     */
    function Component(id, componentName, classPath, scope) {
        this.id = id || null;
        this.componentName = componentName || null;
        this.classPath = classPath || null;
        this.scope = scope || 0 /* SINGLETON */;
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
    Component.prototype.getComponentName = function () {
        return this.componentName;
    };
    /**
     * Function that sets name to the component
     * @param name
     */
    Component.prototype.setComponentName = function (name) {
        this.componentName = name;
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
     * Function that returns the entity instance of the class
     * @returns {any} entity instance
     */
    Component.prototype.getEntityInstance = function () {
        return this.entityInstance;
    };
    /**
     * Function that sets the entity instance to the component
     * @param entityInstance
     */
    Component.prototype.setEntityInstance = function (entityInstance) {
        this.entityInstance = entityInstance;
    };
    return Component;
}());
exports.default = Component;
