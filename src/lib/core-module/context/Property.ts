/**
 * Class that represents property object of the component.
 * It can be represented as two types of instances:
 * 1) value instance (any possible value)
 * 2) reference instance (object value of other possible component
 * that is injected by unique identifier in string format from meta-data)
 */
class Property {

    /**
     * Property name
     */
    private name: string;

    /**
     * Property value
     */
    private value: any;

    /**
     * Injected instance of other component
     */
    private reference: Object;

    /**
     * Property constructor
     * @param name of the property
     */
    constructor(name: string) {
        this.name = name;
    }

    /**
     * Function that returns property's name
     * @returns {string} name
     */
    public getName(): string {
        return this.name;
    }

    /**
     * Function that sets the property's name
     * @param {string} name
     */
    public setName(name: string): void {
        this.name = name;
    }

    /**
     * Function that returns property's value
     * @returns value
     */
    public getValue(): any {
        return this.value;
    }

    /**
     * Function that sets the property's value
     * @param value
     */
    public setValue(value: any): void {
        this.value = value;
    }

    /**
     * Function that returns property's reference
     * @returns {Object} value
     */
    public getReference(): Object {
        return this.reference;
    }

    /**
     * Function that sets property's reference
     * @param {Object} reference
     */
    public setReference(reference: Object): void {
        this.reference = reference;
    }
}

export default Property;
