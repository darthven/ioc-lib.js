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
var TvOrder = (function (_super) {
    __extends(TvOrder, _super);
    function TvOrder(name, price, customer, channels) {
        var _this = _super.call(this, name, price, customer) || this;
        _this.channels = channels || null;
        return _this;
    }
    TvOrder.prototype.getChannels = function () {
        return this.channels;
    };
    TvOrder.prototype.setChannels = function (channels) {
        this.channels = channels;
    };
    return TvOrder;
}(Order_1.default));
exports.default = TvOrder;
