"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PropertyValidator = (function () {
    function PropertyValidator() {
    }
    PropertyValidator.validateName = function (property) {
        return property.getName() && property.getName() != null;
    };
    PropertyValidator.validateValue = function (property) {
        return property.getValue() && property.getValue() != null;
    };
    PropertyValidator.validateReference = function (property) {
        return property.getReference() && property.getReference() != null;
    };
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
