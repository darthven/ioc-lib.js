import Order from './Order'

class Customer {

  private customerId: number;
  private fullname: string;
  private ordersList: Order[];

  constructor(fullname: string, ordersList: Order[]) {
    this.fullname = fullname || null;
    this.ordersList = ordersList || null;
  }

  public getCustomerId(): number {
    return this.customerId;
  }

  public getFullname() : string {
    return this.fullname;
  }

  public setFullname(fullname: string) : void {
    this.fullname = fullname;
  }

  public getOrdersList() : Order[] {
    return this.ordersList;
  }

  public setOrdersList(ordersList: Order[]) : void {
    this.ordersList = ordersList;
  }
}

export default Customer;
