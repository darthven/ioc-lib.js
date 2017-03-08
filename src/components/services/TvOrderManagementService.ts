import OrderManagementService from './OrderManagementService'
import TvOrder from '../entities/TvOrder'
import Customer from '../entities/Customer'

class TvOrderManagementService extends OrderManagementService {

  createOrder(customer: Customer, name: string, price: number, channels: string[]) {
    let order = new TvOrder(name, price, customer, channels);
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

export default TvOrderManagementService;
