import OrderManagementService from './OrderManagementService'
import InternetOrder from '../entities/InternetOrder'
import Customer from '../entities/Customer'

class InternetOrderManagementService extends OrderManagementService {

  createOrder(customer: Customer, name: string, price: number, traffic: number) {
    let order = new InternetOrder(name, price, customer, traffic);
    this.addOrderToCustomer(order, customer);
    return order;
  }

  deleteOrder(orderId: number): boolean {
    //TODO add logic for deleting order
    return true;
  }

  public increaseTraffic(orderId: number, deltaTraffic: number) {
    //TODO add logic for increasing traffic
  }

  public decreaseTraffic(orderId: number, deltaTraffic: number) {
    //TODO add logic for decreasing traffic
  }
}

export default InternetOrderManagementService;
