import Customer from '../Customer'
import Order from '../Order'

class TvOrder extends Order {

  private channels: string[];

  public constructor(name: string, price: number, customer: Customer, channels: string[]) {
    super(name, price, customer);
    this.channels = channels || null;
  }

  public getChannels(): string[] {
    return this.channels
  }

  public setChannels(channels: string[]) {
    this.channels = channels;
  }
}

export default TvOrder;
