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
     * @param {Property} property of the component
     * @returns {boolean} validation result
     */
    PropertyValidator.validateName = function (property) {
        return property.getName() != null && util_1.isString(property.getName());
    };
    /**
     * Function that validates property's value
     * @param {Property} property of the component
     * @returns {boolean} validation result
     */
    PropertyValidator.validateValue = function (property) {
        return property.getValue() != null;
    };
    /**
     * Function that validates property's reference
     * @param {Property} property of the component
     * @returns {boolean} validation result
     */
    PropertyValidator.validateReference = function (property) {
        return property.getReference() != null && util_1.isObject(property.getReference());
    };
    /**
     * Function that validates all properties of the component
     * @param {Property[]} properties of the component
     * @returns {boolean} validation result
     */
    PropertyValidator.validateProperties = function (properties) {
        var _this = this;
        properties.forEach(function (property) {
            if (!property.getValue()) {
                if (!_this.validateName(property) || !_this.validateReference(property)) {
                    return false;
                }
            }
            else if (property.getValue()) {
                if (!_this.validateName(property) || !_this.validateValue(property)) {
                    return false;
                }
            }
        });
        return true;
    };
    return PropertyValidator;
}());
exports.default = PropertyValidator;
