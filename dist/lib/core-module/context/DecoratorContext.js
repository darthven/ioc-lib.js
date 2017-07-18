"use strict";
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
var core_module_1 = require("../core-module");
/**
 * Class that responds for creation and management process of the components,
 * for updating and closing application context in safe-mode,
 * simple representation of Inversion of Control Container based on decorating
 * js-classes, methods and properties
 */
var DecoratorContext = (function (_super) {
    __extends(DecoratorContext, _super);
    function DecoratorContext() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DecoratorContext;
}(core_module_1.Context));
exports.default = DecoratorContext;
