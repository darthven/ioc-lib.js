import Customer from './Customer'

abstract class Order {

  private orderId: number;
  private name: string;
  private price: number;
  private customer: Customer;

  public constructor(name: string, price: number, customer: Customer) {
    this.name = name;
    this.price = price;
    this.customer = customer;
  }

  public getOrderId(): number {
    return this.orderId;
  }

  public getName() : string {
    return this.name;
  }

  public setName(name: string) : void {
    this.name = name;
  }

  public getPrice() : number {
    return this.price;
  }

  public setPrice(price: number) : void {
    this.price = price;
  }

  public getCustomer() : Customer {
    return this.customer;
  }

  public setCustomer(customer: Customer) : void {
    this.customer = customer;
  }
}

export default Order;
