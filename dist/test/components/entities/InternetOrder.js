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
var InternetOrder = (function (_super) {
    __extends(InternetOrder, _super);
    function InternetOrder(name, price, customer, traffic) {
        var _this = _super.call(this, name, price, customer) || this;
        _this.traffic = traffic || null;
        return _this;
    }
    InternetOrder.prototype.getTraffic = function () {
        return this.traffic;
    };
    InternetOrder.prototype.setTraffic = function (traffic) {
        this.traffic = traffic;
    };
    return InternetOrder;
}(Order_1.default));
exports.default = InternetOrder;
