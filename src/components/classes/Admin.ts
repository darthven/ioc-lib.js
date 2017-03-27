import User from './User';

class Admin {

  name: string;
  age: string;
  user: User;

  constructor(name: string, age: string, user: User) {
    this.name = name;
    this.age = age;
    this.user = user;
  }

  public hello(): void {
    console.log('Hello from Admin');
  }

  public bye(): void {
    console.log('Bye from Admin');
  }
}

export default Admin;
