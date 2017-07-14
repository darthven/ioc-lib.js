import {Scope, ComponentNotFoundError, Component} from '../core-module'
import _ = require('lodash');
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
     * Logger for logging all important events in the application context
     */
    protected static logger = require('log4js').getLogger();

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
        Context.logger.info('Closing current context...');
        this.components.forEach((component) => {
            const lifecycle = component.getLifecycle();
            lifecycle.callDestroyMethod();
            this.removeComponentFromContext(component.getId());
        });
        Context.logger.info('Context is closed...');
        this.components.clear();
    }

    /**
     * Function that retrieves component's instance by unique identifier
     * @param {string} componentId unique identifier of the component
     * @returns component's entity instance
     */
    public getComponent(componentId: string): any {
        let component = this.components.get(componentId);
        if (!component) {
            throw new ComponentNotFoundError(`Component was not found by id "${componentId}"`);
        }
        //TODO provide copying components' instances
        if (component.getScope() === Scope.PROTOTYPE) {

        }
        return component.getEntityInstance();
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
}

export default Context;
