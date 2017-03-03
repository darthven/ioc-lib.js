import Customer from '../Customer'
import Order from '../Order'

class InternetOrder extends Order {

  private traffic: number;

  public constructor(name: string, price: number, customer: Customer, traffic: number) {
    super(name, price, customer);
    this.traffic = traffic || null;
  }

  public getTraffic(): number {
    return this.traffic
  }

  public setTraffic(traffic: number) {
    this.traffic = traffic;
  }
}

export default InternetOrder;
