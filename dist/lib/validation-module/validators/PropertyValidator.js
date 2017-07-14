"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("util");
/**
 * Class that responds for validation component's properties
 */
var PropertyValidator = (function () {
    function PropertyValidator() {
    }
    /**
     * Function that validates property's name
     * @param {Object} property of the component
     * @returns {boolean} validation result
     */
    PropertyValidator.validateName = function (property) {
        return property['name'] != null && util_1.isString(property['name']);
    };
    /**
     * Function that validates property's value
     * @param {Object} property of the component
     * @returns {boolean} validation result
     */
    PropertyValidator.validateValue = function (property) {
        return property['value'] != null;
    };
    /**
     * Function that validates property's reference
     * @param {Object} property of the component
     * @returns {boolean} validation result
     */
    PropertyValidator.validateReference = function (property) {
        return property['reference'] != null && util_1.isObject(property['reference']);
    };
    /**
     * Function that validates all properties of the component
     * @param {Object[]} properties of the component
     * @returns {boolean} validation result
     */
    PropertyValidator.validateProperties = function (properties) {
        properties.forEach(function (property) {
            if (!property['value']) {
                if (!PropertyValidator.validateName(property) ||
                    !PropertyValidator.validateReference(property)) {
                    return false;
                }
            }
            else if (property['value']) {
                if (!PropertyValidator.validateName(property) ||
                    !PropertyValidator.validateValue(property)) {
                    return false;
                }
            }
        });
        return true;
    };
    return PropertyValidator;
}());
exports.default = PropertyValidator;
