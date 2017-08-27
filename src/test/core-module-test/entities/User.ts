import {preInit, preDestroy} from "../../../lib/core-module/context/decorators"

export default class User {

    private _name: string;

    constructor(name?: string) {
        this._name = name;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    @preInit
    public initUser(): void {
        console.log("BEFORE Init user");
    };

    @preDestroy
    public destroyUser(): void {
        console.log("BEFORE Destroy user");
    };

    public hello(): void {
        console.log('Hello from User');
    };
}