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
var MobileOrder_1 = require("../entities/MobileOrder");
var MobileOrderManagementService = (function (_super) {
    __extends(MobileOrderManagementService, _super);
    function MobileOrderManagementService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MobileOrderManagementService.prototype.createOrder = function (customer, name, price, operators) {
        var order = new MobileOrder_1.default(name, price, customer, operators);
        _super.prototype.addOrderToCustomer.call(this, order, customer);
        return order;
    };
    MobileOrderManagementService.prototype.deleteOrder = function (orderId) {
        //TODO add logic for deleting order
        return true;
    };
    MobileOrderManagementService.prototype.addOperator = function (orderId, operator) {
        //TODO add logic for adding operator
    };
    MobileOrderManagementService.prototype.removeOperator = function (orderId, operator) {
        //TODO add logic for removing operator
    };
    return MobileOrderManagementService;
}(OrderManagementService_1.default));
exports.default = MobileOrderManagementService;
