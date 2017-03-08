import Customer from '../Customer'
import Order from '../Order'

class MobileOrder extends Order {

  private operators: string[];

  public constructor(name: string, price: number, customer: Customer, operators: string[]) {
    super(name, price, customer);
    this.operators = operators || null;
  }

  public getOperators(): string[] {
    return this.operators
  }

  public setOperators(operators: string[]) {
    this.operators = operators;
  }
}

export default MobileOrder;
