import {LOGGER} from "../../utils/logger";
import {default as Component, Scope} from "./Component";
import ContextLifecycle from "./ContextLifecycle";
import ComponentNotFoundError from "../errors/ComponentNotFoundError";
const _ = require('lodash');

/**
 * Class that responds for creation and management process of the components,
 * for updating and closing application context in safe-mode,
 * simple representation of Inversion of Control Container
 */
abstract class Context {

    /**
     * Components which were registered in application context
     * by key as unique component's identifier and by value as the component instance
     */
    protected components: Map<string, Component>;

    /**
     * Lifecycle of the application context
     */
    protected contextLifecycle: ContextLifecycle;

    /**
     * Default constructor of the context
     */
    constructor() {
        this.contextLifecycle = new ContextLifecycle();
        this.components = new Map<string, Component>();
    }

    /**
     * Function that returns lifecycle of the context
     * @returns {ContextLifecycle} lifecycle
     */
    public getContextLifecycle(): ContextLifecycle {
        return this.contextLifecycle;
    }

    /**
     * Function that returns the map of components with their unique identifiers as keys
     * @returns {Map<string, Component>} map of the components
     */
    public getComponents(): Map<string, Component> {
        return this.components;
    }

    /**
     * Function that removes component from application context by unique identifier
     * @param {string} componentId unique identifier of the component
     * @returns {boolean}
     */
    private removeComponentFromContext(componentId: string): boolean {
        return this.components.delete(componentId);
    }

    /**
     * Function that removes all components from application context,
     * calls destroy-methods before their deletion and finally closes it
     */
    private close(): void {
        LOGGER.info('[Context]: Closing current context...');
        this.components.forEach((component) => {
            const lifecycle = this.contextLifecycle.getComponentLifecycles().get(component.getId());
            lifecycle.callPreDestroyMethod();
            this.removeComponentFromContext(component.getId());
            lifecycle.callPostDestroyMethod();
        });
        LOGGER.info('[Context]: Context is closed...');
        this.components.clear();
    }

    /**
     * Function that closes application context in safe-mode
     * as the main program's process is finished.
     */
    public registerShutdownHook(): void {
        process.on('exit', () => {
            this.close();
        });
        process.on('SIGINT', () => {
            this.close();
        });
    }

    /**
     * Function that retrieves component's instance by unique identifier
     * @returns component's entity instance
     * @param Class class instance
     */
    public getComponentEntityInstanceById(componentId: string): any {
        const component = this.components.get(componentId);
        if (!component) {
            throw new ComponentNotFoundError(componentId);
        }
        if (component.getScope() === Scope.PROTOTYPE) {
            return _.cloneDeep(component.getEntityInstance());
        }
        return component.getEntityInstance();
    }

    /**
     * Function that registers components in the application context
     */
    protected abstract registerComponentsInContext(): void;

    /**
     * Function that updates context. Can be called if you need to update context
     * after updating meta-data in configuration files
     */
    public updateContext(): void {
        this.registerComponentsInContext();
    }
}

export default Context;
