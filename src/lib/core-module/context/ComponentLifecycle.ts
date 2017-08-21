import {isNull} from "util";
import {LOGGER} from "../../utils/logger";
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
    private preInitMethod: Function;

    /**
     * Function that is called after the initialization of the component
     */
    private postInitMethod: Function;

    /**
     * Function that is called before setting all properties to the component
     */
    private beforePropertiesWillBeSetMethod: Function;

    /**
     * Function that is called after setting all properties to the component
     */
    private afterPropertiesWereSetMethod: Function;

    /**
     * Function that is called before removing component from the application context
     */
    private preDestroyMethod: Function;

    /**
     * Function that is called after removing component from the application context
     */
    private postDestroyMethod: Function;

    /**
     * Component's constructor
     * @param componentId id of the component
     */
    constructor(componentId: string) {
        this.componentId = componentId;
        this.setDefaultLifecycleMethods();
    }

    /**
     * Function that sets default lifecycle methods.
     * They can be override by custom methods which are
     * described in metadata from configuration files
     */
    private setDefaultLifecycleMethods() {
        this.preInitMethod =
            () => LOGGER.info(`[Component Lifecycle]: Default pre-init-method is called to the component with id "${this.componentId}"`);
        this.postInitMethod =
            () => LOGGER.info(`[Component Lifecycle]: Default post-init-method is called to the component with id "${this.componentId}"`);
        this.beforePropertiesWillBeSetMethod =
            () => LOGGER.info(`[Component Lifecycle]: Default before-properties-will-be-set-method is called to the component with id "${this.componentId}"`);
        this.afterPropertiesWereSetMethod =
            () => LOGGER.info(`[Component Lifecycle]: Default after-properties-were-set-method is called to the component with id "${this.componentId}"`);
        this.preDestroyMethod =
            () => LOGGER.info(`[Component Lifecycle]: Default pre-destroy-method is called to the component with id "${this.componentId}"`);
        this.postDestroyMethod =
            () => LOGGER.info(`[Component Lifecycle]: Default post-destroy-method is called to the component with id "${this.componentId}"`);
    }

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
     * Function that executes pre-init-method of the component
     */
    public callPreInitMethod(): void {
        LOGGER.debug(`[Component Lifecycle]: Before Component with id "${this.getComponentId()}" will be initialized`);
        this.preInitMethod();
    }

    /**
     * Function that sets pre-init-method of the component to its lifecycle
     * @param {Function} preInitMethod is called before the initialization of the component
     */
    public setPreInitMethod(preInitMethod: Function): void {
        this.preInitMethod = preInitMethod;
    }

    /**
     * Function that executes post-init-method of the component
     */
    public callPostInitMethod(): void {
        LOGGER.debug(`[Component Lifecycle]: After Component with id "${this.getComponentId()}" was initialized`);
        this.postInitMethod();
    }

    /**
     * Function that sets post-init-method of the component to its lifecycle
     * @param {Function} postInitMethod is called after the initialization of the component
     */
    public setPostInitMethod(postInitMethod: Function): void {
        this.postInitMethod = postInitMethod;
    }

    /**
     * Function that is executed before setting all properties of the component
     */
    public callBeforePropertiesWillBeSetMethod(): void {
        LOGGER.debug(`[Component Lifecycle]: Before Component with id "${this.getComponentId()}" will receive its properties`);
        this.beforePropertiesWillBeSetMethod();
    }

    /**
     * Function that sets method that will be executed before setting
     * all properties of the component to its lifecycle
     * @param {Function} beforePropertiesWillBeSetMethod is called before setting
     * all properties to the component
     */
    public setBeforePropertiesWillBeSetMethod(beforePropertiesWillBeSetMethod: Function): void {
        this.beforePropertiesWillBeSetMethod = beforePropertiesWillBeSetMethod
    }

    /**
     * Function that is executed after setting all properties of the component
     */
    public callAfterPropertiesWereSetMethod(): void {
        LOGGER.debug(`[Component Lifecycle]: After Component with id "${this.getComponentId()}" received its properties`);
        this.afterPropertiesWereSetMethod();
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
    public callPreDestroyMethod(): void {
        LOGGER.debug(`[Component Lifecycle]: Before Component with id "${this.getComponentId()}" will be destroyed`);
        this.preDestroyMethod();
    }

    /**
     * Function that sets method that will be executed before setting
     *  removing component from the application context to its lifecycle
     * @param {Function} preDestroyMethod is called before removing component from the application context
     */
    public setPreDestroyMethod(preDestroyMethod: Function): void {
        this.preDestroyMethod = preDestroyMethod;
    }

    /**
     * Function that is executed after removing component from the application context
     */
    public callPostDestroyMethod(): void {
        LOGGER.debug(`[Component Lifecycle]: After Component with id "${this.getComponentId()}" was destroyed`);
        this.postDestroyMethod();
    }

    /**
     * Function that sets method that will be executed after removing component
     * from the application context to its lifecycle
     * @param {Function} postDestroyMethod is called after removing component from the application context
     */
    public setPostDestroyMethod(postDestroyMethod: Function): void {
        this.postDestroyMethod = postDestroyMethod;
    }

    /**
     * Function that sets all lifecycle methods to the component's lifecycle instance
     * @param lifecycleMethodsDescriptor descriptor that has methods' names as keys and
     * functions as values
     */
    public setLifecycleMethods(lifecycleMethodsDescriptor: any): void {
        Object.keys(lifecycleMethodsDescriptor).forEach((methodName) => {
            if (this[methodName] && !isNull(lifecycleMethodsDescriptor[methodName])) {
                this[methodName] = lifecycleMethodsDescriptor[methodName];
            }
        })
    }
}

export default ComponentLifecycle;
