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
    private componentName: string;

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
     * Instance of the entity class
     */
    private entityInstance: any;

    /**
     * Component's constructor
     * @param id unique identifier
     * @param componentName of the component
     * @param classPath path to the class of the entity
     * @param scope of the component
     */
    constructor(id?: string, componentName?: string, classPath?: string, scope?: Scope) {
        this.id = id || null;
        this.componentName = componentName || null;
        this.classPath = classPath || null;
        this.scope = scope || Scope.SINGLETON;
    }

    /**
     * Function that returns component's unique identifier
     * @returns {string} unique identifier
     */
    public getId(): string {
        return this.id;
    }

    /**
     * Function that returns component's name
     * @returns {string} name of the component
     */
    public getComponentName(): string {
        return this.componentName;
    }

    /**
     * Function that returns path to the class of component's entity
     * @returns {string} path to the class
     */
    public getClassPath(): string {
        return this.classPath;
    }

    /**
     * Function that returns scope of the component
     * @returns {Scope} component's scope
     */
    public getScope(): Scope {
        return this.scope;
    }

    /**
     * Function that returns the entity instance of the class
     * @returns {} entity instance
     */
    public getEntityInstance(): any {
        return this.entityInstance;
    }

    /**
     * Function that sets the entity instance to the component
     * @param entityInstance
     */
    public setEntityInstance(entityInstance: any): void {
        this.entityInstance = entityInstance;
    }
}

export default Component;
