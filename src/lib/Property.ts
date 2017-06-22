class Property {

  private name: string;
  private value: any;
  private reference: Object;

  constructor(name: string) {
    this.name = name;
  }

  public getName() : string {
    return this.name;
  }

  public setName(name: string) : void {
    this.name = name;
  }

  public getValue() : any {
    return this.value;
  }

  public setValue(value: any) : void {
    this.value = value;
  }

  public getReference() : Object {
    return this.reference;
  }

  public setReference(reference: Object) : void {
    this.reference = reference;
  }
}

export default Property;
