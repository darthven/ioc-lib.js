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
var OrderManagementService_1 = require("./OrderManagementService");
var TvOrder_1 = require("../entities/TvOrder");
var TvOrderManagementService = (function (_super) {
    __extends(TvOrderManagementService, _super);
    function TvOrderManagementService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TvOrderManagementService.prototype.createOrder = function (customer, name, price, channels) {
        var order = new TvOrder_1.default(name, price, customer, channels);
        _super.prototype.addOrderToCustomer.call(this, order, customer);
        return order;
    };
    TvOrderManagementService.prototype.deleteOrder = function (orderId) {
        //TODO add logic for deleting order
        return true;
    };
    TvOrderManagementService.prototype.addChannel = function (orderId, deltaTraffic) {
        //TODO add logic for adding channel
    };
    TvOrderManagementService.prototype.removeChannel = function (orderId, deltaTraffic) {
        //TODO add logic for removing channel
    };
    TvOrderManagementService.prototype.changeChannels = function (orderId, newChannels) {
        //TODO add logic for changing current channels
    };
    return TvOrderManagementService;
}(OrderManagementService_1.default));
exports.default = TvOrderManagementService;
