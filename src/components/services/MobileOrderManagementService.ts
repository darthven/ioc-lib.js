import OrderManagementService from './OrderManagementService'
import MobileOrder from '../entities/MobileOrder'
import Customer from '../entities/Customer'

class MobileOrderManagementService extends OrderManagementService {

  createOrder(customer: Customer, name: string, price: number, operators: string[]) {
    let order = new MobileOrder(name, price, customer, operators);
    super.addOrderToCustomer(order, customer);
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

export default MobileOrderManagementService;
