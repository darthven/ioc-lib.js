"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Customer = (function () {
    function Customer(fullname, ordersList) {
        this.fullname = fullname || null;
        this.ordersList = ordersList || null;
    }
    Customer.prototype.getCustomerId = function () {
        return this.customerId;
    };
    Customer.prototype.getFullname = function () {
        return this.fullname;
    };
    Customer.prototype.setFullname = function (fullname) {
        this.fullname = fullname;
    };
    Customer.prototype.getOrdersList = function () {
        return this.ordersList;
    };
    Customer.prototype.setOrdersList = function (ordersList) {
        this.ordersList = ordersList;
    };
    return Customer;
}());
exports.default = Customer;
