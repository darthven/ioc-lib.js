"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Property = (function () {
    function Property(name) {
        this.name = name;
    }
    Property.prototype.getName = function () {
        return this.name;
    };
    Property.prototype.setName = function (name) {
        this.name = name;
    };
    Property.prototype.getValue = function () {
        return this.value;
    };
    Property.prototype.setValue = function (value) {
        this.value = value;
    };
    Property.prototype.getReference = function () {
        return this.reference;
    };
    Property.prototype.setReference = function (reference) {
        this.reference = reference;
    };
    return Property;
}());
exports.default = Property;
