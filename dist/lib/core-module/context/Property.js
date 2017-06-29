"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class that represents property object of the component.
 * It can be represented as two types of instances:
 * 1) value instance (any possible value)
 * 2) reference instance (object value of other possible component
 * that is injected by unique identifier in string format from meta-data)
 */
var Property = (function () {
    /**
     * Property constructor
     * @param name of the property
     */
    function Property(name) {
        this.name = name;
    }
    /**
     * Function that returns property's name
     * @returns {string} name
     */
    Property.prototype.getName = function () {
        return this.name;
    };
    /**
     * Function that sets the property's name
     * @param {string} name
     */
    Property.prototype.setName = function (name) {
        this.name = name;
    };
    /**
     * Function that returns property's value
     * @returns value
     */
    Property.prototype.getValue = function () {
        return this.value;
    };
    /**
     * Function that sets the property's value
     * @param value
     */
    Property.prototype.setValue = function (value) {
        this.value = value;
    };
    /**
     * Function that returns property's reference
     * @returns {Object} value
     */
    Property.prototype.getReference = function () {
        return this.reference;
    };
    /**
     * Function that sets property's reference
     * @param {Object} reference
     */
    Property.prototype.setReference = function (reference) {
        this.reference = reference;
    };
    return Property;
}());
exports.default = Property;
