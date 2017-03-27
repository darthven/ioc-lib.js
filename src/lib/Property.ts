class Property {

  private name: string;
  private value;
  private reference;

  constructor(name: string) {
    this.name = name;
  }

  public getName() : string {
    return this.name;
  }

  public setName(name: string) : void {
    this.name = name;
  }

  public getValue() : string {
    return this.value;
  }

  public setValue(value) : void {
    this.value = value;
  }

  public getReference() {
    return this.reference;
  }

  public setReference(reference) : void {
    this.reference = reference;
  }
}

export default Property;
