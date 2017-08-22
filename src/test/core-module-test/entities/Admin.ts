import User from './User'
import {injected} from "../../../lib/core-module/context/decorators";

export default class Admin {

    private _name: string;

    private _age: number;

    private _user: User;

    constructor(name: string, age: number, user: User) {
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

    @injected
    set user(value: User) {
        this._user = value;
    }

    public hello(): void {
        console.log('Hello from Admin');
    };
    public bye(): void {
        console.log('Bye from Admin');
    };
    public preInitAdmin(): void {
        console.log("BEFORE Init admin");
    };
    public postInitAdmin(): void {
        console.log("AFTER Init admin");
    };
    public beforeSettingPropertiesForAdmin(): void {
        console.log("BEFORE Properties were set admin");
    };
    public afterSettingPropertiesForAdmin(): void {
        console.log("AFTER Properties were set admin");
    };
    public preDestroyAdmin(): void {
        console.log("BEFORE Destroy admin");
    };
    public postDestroyAdmin(): void {
        console.log("AFTER Destroy admin");
    };
}
