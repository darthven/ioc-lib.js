/**
 * Class that is responsive for the components' lifecycle
 * management in the application context.
 */

class ComponentLifecycle {

    /**
     * The unique identifier of the component
     */
    private componentId: string;

    /**
     * Function that is called before the initialization of the component
     */
    private initMethod: Function;

    /**
     * Function that is called after setting all properties to the component
     */
    private afterPropertiesWereSetMethod: Function;

    /**
     * Function that is called before removing component from the application context
     */
    private destroyMethod: Function;

    /**
     * Logger for logging all important events during components' existence
     */
    private static logger = require('log4js').getLogger();

    /**
     * Function that returns component's unique identifier
     * @returns {string} unique identifier of the component
     */
    public getComponentId(): string {
        return this.componentId;
    }

    /**
     * Function that sets the component's unique identifier to its lifecycle
     * @param {string} componentId unique identifier of the component
     */
    public setComponentId(componentId: string): void {
        this.componentId = componentId;
    }

    /**
     * Function that executes init-method of the component
     */
    public callInitMethod(): void {
        this.initMethod();
        ComponentLifecycle.logger.debug(`Component with id "${this.getComponentId()}" was initialized`);
    }

    /**
     * Function that sets init-method of the component to its lifecycle
     * @param {Function} initMethod is called before the initialization of the component
     */
    public setInitMethod(initMethod: Function): void {
        this.initMethod = initMethod;
    }

    /**
     * Function that is executed after setting all properties of the component
     */
    public callAfterPropertiesWereSetMethod(): void {
        this.afterPropertiesWereSetMethod();
        ComponentLifecycle.logger.debug(`Component with id "${this.getComponentId()}" received its properties`);
    }

    /**
     * Function that sets method that will be executed after setting
     * all properties of the component to its lifecycle
     * @param {Function} afterPropertiesWereSetMethod is called after setting all properties to the component
     */
    public setAfterPropertiesWereSetMethod(afterPropertiesWereSetMethod: Function): void {
        this.afterPropertiesWereSetMethod = afterPropertiesWereSetMethod
    }

    /**
     * Function that is executed before removing component from the application context
     */
    public callDestroyMethod(): void {
        this.destroyMethod();
        ComponentLifecycle.logger.debug(`Component with id "${this.getComponentId()}" was destroyed`);
    }

    /**
     * Function that sets method that will be executed before setting
     *  removing component from the application context to its lifecycle
     * @param {Function} destroyMethod is called before removing component from the application context
     */
    public setDestroyMethod(destroyMethod: Function): void {
        this.destroyMethod = destroyMethod;
    }
}

export default ComponentLifecycle;
