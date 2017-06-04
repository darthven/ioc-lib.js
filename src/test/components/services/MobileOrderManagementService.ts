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
    //TODO add logic for deleting order
    return true;
  }

  public addOperator(orderId: number, operator: string) {
    //TODO add logic for adding operator
  }

  public removeOperator(orderId: number, operator: string) {
    //TODO add logic for removing operator
  }
}

export default MobileOrderManagementService;
