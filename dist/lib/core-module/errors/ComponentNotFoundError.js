"use strict";
/**
 * Class of error that describes situation when the component
 * cannot be found in application context during dependency lookup process
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentNotFoundError = (function (_super) {
    __extends(ComponentNotFoundError, _super);
    function ComponentNotFoundError(componentId) {
        var _this = _super.call(this, "Component with id \"" + componentId + "\" cannot be found in context") || this;
        _this.name = 'ComponentNotFoundError';
        return _this;
    }
    return ComponentNotFoundError;
}(Error));
exports.default = ComponentNotFoundError;
