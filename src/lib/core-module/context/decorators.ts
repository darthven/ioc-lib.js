import {default as Component} from "./Component";
import DecoratorContext from "./DecoratorContext"

/**
 * Decorator that responds for wrapping functions
 * which return some entity-objects. Instead of entity-objects
 * they will return special objects that contain property responsible for
 * generation of component based on those entities.
 * @param componentDescriptor describes which names, class paths and scopes
 * entity-objects will have
 * @returns {(target:Function, key:string)=>any} function that is wrapping of
 * native function of the current class/module
 */
export function component(componentDescriptor: Object) : Function {   
    return (target: Function, key: string): any => {
        const getEntityInstance: Function = target[key];
        const getComponentInstance = () => {
            const generateComponentId: Function = () => {
                return Math.random().toString(36).substring(2, 7);
            };
            let componentId: string = componentDescriptor["id"] || generateComponentId();
            const component: Component = new Component(componentId,
                componentDescriptor['name'], componentDescriptor['classPath'], componentDescriptor['scope']);
            component.setEntityInstance(getEntityInstance.call(target));
            return component;
        };
        Object.defineProperty(target, key, {
            value: getComponentInstance            
        });
        return Object.getOwnPropertyDescriptor(target, key);
    }
}
