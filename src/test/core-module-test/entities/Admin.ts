import User from './User'
import {preInit, postInit, preDestroy, postDestroy} from "../../../lib/core-module/context/decorators"

export default class Admin {

    private _name: string;

    private _age: number;

    private _user: User;

    constructor(name: string, age: number, user?: User) {
        this._name = name;
        this._age = age;
        this._user = user;
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
    };
    public bye(): void {
        console.log('Bye from Admin');
    };

    @preInit
    public preInitAdmin(): void {
        console.log("BEFORE Init admin");
    };

    @postInit
    public postInitAdmin(): void {
        console.log("AFTER Init admin");
    };

    @preDestroy
    public preDestroyAdmin(): void {
        console.log("BEFORE Destroy admin");
    };

    @postDestroy
    public postDestroyAdmin(): void {
        console.log("AFTER Destroy admin");
    };
}
