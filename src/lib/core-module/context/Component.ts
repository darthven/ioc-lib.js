import {ComponentLifecycle, Property} from '../core-module'

/**
 * Enumeration of two possible component's scopes.
 * It can be represented as two types of values:
 * 1) SINGLETON (component based on this object will be created once in the application context)
 * 2) PROTOTYPE (component can be created several times as the copies of the one main instance)
 */
export const enum Scope {
    SINGLETON,
    PROTOTYPE
}

/**
 * Class that represents any entity marked as class in the custom application
 * in the application context and allows you to inject other entities to itself
 * according to Dependency Injection mechanism.
 */
class Component {

    /**
     * Unique identifier of the component
     */
    private id: string;

    /**
     * Name of the component
     */
    private name: string;

    /**
     * Path to the class of the entity
     * of custom application
     */
    private classPath: string;

    /**
     * Scope of the component
     */
    private scope: Scope;

    /**
     * Lifecycle of the component
     */
    private lifecycle: ComponentLifecycle;

    /**
     * Properties of the component
     */
    private properties: Property[];

    /**
     * Component's constructor
     * @param id unique identifier
     * @param name of the component
     * @param classPath path to the class of the entity
     * @param scope of the component
     * @param lifecycle of the component
     */
    constructor(id: string, name: string, classPath: string, scope: Scope, lifecycle: ComponentLifecycle) {
        this.id = id;
        this.name = name;
        this.classPath = classPath;
        this.scope = scope;
        this.lifecycle = lifecycle;
    }

    /**
     *
     * @returns {string}
     */
    public getId(): string {
        return this.id;
    }

    /**
     *
     * @param {string} id
     */
    public setId(id: string): void {
        this.id = id;
    }

    /**
     *
     * @returns {string}
     */
    public getName(): string {
        return this.name;
    }

    /**
     *
     * @param name
     */
    public setName(name: string): void {
        this.name = name;
    }

    /**
     *
     * @returns {Property[]}
     */
    public getProperties(): Property[] {
        return this.properties;
    }

    /**
     *
     * @param properties
     */
    public setProperties(properties: Property[]): void {
        this.properties = properties;
    }

    /**
     *
     * @returns {string}
     */
    public getClassPath(): string {
        return this.classPath;
    }

    /**
     *
     * @param classPath
     */
    public setClassPath(classPath: string): void {
        this.classPath = classPath;
    }

    /**
     *
     * @returns {Scope}
     */
    public getScope(): Scope {
        return this.scope;
    }

    /**
     *
     * @param scope
     */
    public setScope(scope: Scope): void {
        this.scope = scope;
    }

    /**
     *
     * @returns {ComponentLifecycle}
     */
    public getLifecycle(): ComponentLifecycle {
        return this.lifecycle;
    }

    /**
     *
     * @param lifecycle
     */
    public setLifecycle(lifecycle: ComponentLifecycle): void {
        this.lifecycle = lifecycle;
    }
}

export default Component;
