export default class User {

    private _name: string;

    constructor(name: string) {
        this._name = name;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    public initUser(): void {
        console.log("BEFORE Init user");
    };
    public setPropertiesForUser(): void {
        console.log("AFTER Properties were set user");
    };
    public destroyUser(): void {
        console.log("BEFORE Destroy user");
    };
    public hello(): void {
        console.log('Hello from User');
    };
}