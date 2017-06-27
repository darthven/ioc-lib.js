"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Order = (function () {
    function Order(name, price, customer) {
        this.name = name;
        this.price = price;
        this.customer = customer;
    }
    Order.prototype.getOrderId = function () {
        return this.orderId;
    };
    Order.prototype.getName = function () {
        return this.name;
    };
    Order.prototype.setName = function (name) {
        this.name = name;
    };
    Order.prototype.getPrice = function () {
        return this.price;
    };
    Order.prototype.setPrice = function (price) {
        this.price = price;
    };
    Order.prototype.getCustomer = function () {
        return this.customer;
    };
    Order.prototype.setCustomer = function (customer) {
        this.customer = customer;
    };
    return Order;
}());
exports.default = Order;
