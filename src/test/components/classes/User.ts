class User {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  public hello(): void {
    console.log('Hello from User');
  }

  public initUser(): void {
    console.log("Init user");
  }

  public setPropertiesForUser(): void {
    console.log("Properties were set user");
  }

  public destroyUser(): void {
    console.log("Destroy user");
  }
}

export default User;
