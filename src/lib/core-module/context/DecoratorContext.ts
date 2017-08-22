import {Context} from "../core-module"
import {Scope} from "./Component";
const _ = require('lodash');
import ComponentNotFoundError from "../errors/ComponentNotFoundError";

/**
 * Class that responds for creation and management process of the components,
 * for updating and closing application context in safe-mode,
 * simple representation of Inversion of Control Container based on decorating
 * js-classes, methods and properties
 */
class DecoratorContext extends Context {

    /**
     * Array of configuration classes/modules
     */
    private configs: any[];

    /**
     * Context constructor for configuration-base usage
     * @param configs configuration classes/modules
     */
    constructor(configs?: any[]) {
        super();
        if(configs) {
            this.configs = configs;
            this.registerComponentsInContext();
        }
    }

    /**
     * Function that registers components in the application context
     */
    protected registerComponentsInContext(): void {
        this.configs.forEach((config) => {
            const prototype = config['prototype'];
            const values = Object.keys(prototype).map(function(key) {
                return prototype[key];
            });
            values.forEach((value) => {
                if(value.hasOwnProperty('componentInstance')) {
                    const component = value['componentInstance'].call();
                    this.components.set(component['id'], component);
                }
            });
        });
    }

    /**
     * Function that retrieves component's instance by unique identifier
     * @returns component's entity instance
     * @param Class class instance
     */
    public getComponentEntityInstance(Class: any): any {
        const componentsArray = Array.from(this.components.values());
        for(let i = 0; i < componentsArray.length; i++) {
            let componentInstance = componentsArray[i].getEntityInstance();
            if(componentInstance instanceof Class) {
                if (componentsArray[i].getScope() === Scope.PROTOTYPE) {
                    return _.cloneDeep(componentInstance);
                }
                return componentInstance;
            } else if(i === componentsArray.length - 1) {
                throw new ComponentNotFoundError('undefined');
            }
        }
    }
}

export default DecoratorContext