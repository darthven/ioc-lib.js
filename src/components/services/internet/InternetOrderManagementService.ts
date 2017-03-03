import OrderManagementService from '../OrderManagementService'
import InternetOrder from '../../entities/internet/InternetOrder'
import Customer from '../../entities/Customer'

class InternetOrderManagementService extends OrderManagementService {

  createOrder(customer: Customer, name: string, price: number, traffic: number) {
    let order = new InternetOrder(name, price, customer, traffic);
    this.addOrderToCustomer(order, customer);
    return order;
  }

  deleteOrder(orderId: number): boolean {
    return true;
  } 


  public checkOrderParameters(orderId) {

  }

  public increaseTraffic(orderId: number, deltaTraffic: number) {

  }

  public decreaseTraffic(orderId: number, deltaTraffic: number) {

  }
}

export default InternetOrderManagementService;
