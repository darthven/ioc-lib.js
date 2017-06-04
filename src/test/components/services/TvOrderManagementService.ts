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
    //TODO add logic for deleting order
    return true;
  }

  public addChannel(orderId: number, deltaTraffic: number) {
    //TODO add logic for adding channel
  }

  public removeChannel(orderId: number, deltaTraffic: number) {
    //TODO add logic for removing channel
  }

  public changeChannels(orderId: number, newChannels: string[]) {
    //TODO add logic for changing current channels
  }
}

export default TvOrderManagementService;
