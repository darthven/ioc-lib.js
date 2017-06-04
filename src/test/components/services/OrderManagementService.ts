import Order from '../entities/Order';
import Customer from '../entities/Customer'

abstract class OrderManagementService {

  public abstract createOrder(customer: Customer, ...orderParameters: any[]): any;
  public abstract deleteOrder(orderId: number): boolean;

  protected addOrderToCustomer(order: Order, customer: Customer) {
    let ordersList = customer.getOrdersList();
    if(ordersList) {
      ordersList.push(order);
      customer.setOrdersList(ordersList);
    } else {
      customer.setOrdersList([order]);
    }
  }

  protected removeOrderFromCustomer(orderId: number, customer: Customer) {
    let ordersList = customer.getOrdersList();
    if(ordersList) {
      ordersList.forEach(function(order, index, ordersList) {
        if(order.getOrderId() === orderId) {
          ordersList.splice(index, 1);
        }
      });
      customer.setOrdersList(ordersList);
    }
  }
}
export default OrderManagementService;
