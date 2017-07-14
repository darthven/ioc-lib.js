class User {
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  public hello(): void {
    console.log('Hello from User');
  }

  public initUser(): void {
    console.log("Init user");
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  public setPropertiesForUser(): void {
    console.log("Properties were set user");
  }

  public destroyUser(): void {
    console.log("Destroy user");
  }
}

export default User;
