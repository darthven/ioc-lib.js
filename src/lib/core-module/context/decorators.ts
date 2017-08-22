import {default as Component} from "./Component";

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
        const getEntityInstance = target[key];
        const getComponentInstance = () => {
            const generateComponentId = () => {
                return Math.random().toString(36).substring(2, 7);
            };
            const component = new Component(generateComponentId(),
                componentDescriptor['name'], componentDescriptor['classPath'], componentDescriptor['scope']);
            component.setEntityInstance(getEntityInstance.call());
            return component;
        };
        Object.defineProperty(target, key, {
            value: {
                componentInstance: getComponentInstance
            },
        });
        return Object.getOwnPropertyDescriptor(target, key);
    }
}

export function injected(target, key, descriptor) {
    console.log(target);
    console.log(key);
    console.log(descriptor);;
    Object.defineProperty(target, key,
        { get: () => {},
          set: () => {},
            enumerable: true,
            configurable: true
        })
}

