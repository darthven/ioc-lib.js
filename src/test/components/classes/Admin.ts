import User from './User';

class Admin {

    private _name: string;
    private _age: number;
    private _user: User;

    constructor();

    constructor(name: string, age: number, user: User);

    constructor(name?: string, age?: number, user?: User) {
        this._name = name || null;
        this._age = age || null;
        this._user = user || null;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get age(): number {
        return this._age;
    }

    set age(value: number) {
        this._age = value;
    }

    get user(): User {
        return this._user;
    }

    set user(value: User) {
        this._user = value;
    }

    public hello(): void {
        console.log('Hello from Admin');
    }

    public bye(): void {
        console.log('Bye from Admin');
    }

    public initAdmin(): void {
        console.log("Init admin");
    }

    public setPropertiesForAdmin(): void {
        console.log("Properties were set admin");
    }

    public destroyAdmin(): void {
        console.log("Destroy admin");
    }
}

export default Admin;
