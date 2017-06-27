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
var Order_1 = require("./Order");
var MobileOrder = (function (_super) {
    __extends(MobileOrder, _super);
    function MobileOrder(name, price, customer, operators) {
        var _this = _super.call(this, name, price, customer) || this;
        _this.operators = operators || null;
        return _this;
    }
    MobileOrder.prototype.getOperators = function () {
        return this.operators;
    };
    MobileOrder.prototype.setOperators = function (operators) {
        this.operators = operators;
    };
    return MobileOrder;
}(Order_1.default));
exports.default = MobileOrder;
