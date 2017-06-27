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
var InternetOrder_1 = require("../entities/InternetOrder");
var InternetOrderManagementService = (function (_super) {
    __extends(InternetOrderManagementService, _super);
    function InternetOrderManagementService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InternetOrderManagementService.prototype.createOrder = function (customer, name, price, traffic) {
        var order = new InternetOrder_1.default(name, price, customer, traffic);
        this.addOrderToCustomer(order, customer);
        return order;
    };
    InternetOrderManagementService.prototype.deleteOrder = function (orderId) {
        //TODO add logic for deleting order
        return true;
    };
    InternetOrderManagementService.prototype.increaseTraffic = function (orderId, deltaTraffic) {
        //TODO add logic for increasing traffic
    };
    InternetOrderManagementService.prototype.decreaseTraffic = function (orderId, deltaTraffic) {
        //TODO add logic for decreasing traffic
    };
    return InternetOrderManagementService;
}(OrderManagementService_1.default));
exports.default = InternetOrderManagementService;
