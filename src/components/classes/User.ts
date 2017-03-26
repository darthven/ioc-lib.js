class User {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  public hello(): void {
    console.log('Hello from User');
  }
}

export default User;
