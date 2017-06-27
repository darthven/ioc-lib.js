"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OrderManagementService = (function () {
    function OrderManagementService() {
    }
    OrderManagementService.prototype.addOrderToCustomer = function (order, customer) {
        var ordersList = customer.getOrdersList();
        if (ordersList) {
            ordersList.push(order);
            customer.setOrdersList(ordersList);
        }
        else {
            customer.setOrdersList([order]);
        }
    };
    OrderManagementService.prototype.removeOrderFromCustomer = function (orderId, customer) {
        var ordersList = customer.getOrdersList();
        if (ordersList) {
            ordersList.forEach(function (order, index, ordersList) {
                if (order.getOrderId() === orderId) {
                    ordersList.splice(index, 1);
                }
            });
            customer.setOrdersList(ordersList);
        }
    };
    return OrderManagementService;
}());
exports.default = OrderManagementService;
