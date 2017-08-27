import {default as Component} from "./Component";
import ComponentLifecycle from "./ComponentLifecycle";

/**
 * Definition of the component's descriptor
 */
interface ComponentDescriptor {
    /**
     * Instance of the component
     */
    component: Component;

    /**
     * Lifecycle of the component
     */
    lifecycle: ComponentLifecycle;
}

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
export function component(componentDescriptor: Object): Function {
    return (target: Function, key: string): any => {
        const getEntityInstance: Function = target[key];
        const getComponentDescriptor = (): ComponentDescriptor => {
            const entityInstance = getEntityInstance.call(target);
            const entityPrototype = Object.getPrototypeOf(entityInstance);
            Object.keys(entityInstance).forEach((propertyName) => {
                if (entityInstance[propertyName] &&
                    entityInstance[propertyName].hasOwnProperty('component')) {
                    entityInstance[propertyName] = entityInstance[propertyName]['component'].getEntityInstance();
                }
            });
            const componentId: string = componentDescriptor["id"] || generateComponentId();
            const component: Component = new Component(componentId,
                componentDescriptor['name'], componentDescriptor['classPath'], componentDescriptor['scope']);
            const lifecycle: ComponentLifecycle = getComponentLifecycle(entityPrototype, componentId);
            component.setEntityInstance(entityInstance);
            return {
                component: component,
                lifecycle: lifecycle
            };
        };
        Object.defineProperty(target, key, {
            value: getComponentDescriptor
        });
        return Object.getOwnPropertyDescriptor(target, key);
    }
}

/**
 * Function that generates unique identifier
 * for the components
 * @returns {string}
 */
const generateComponentId: Function = (): string => {
    return Math.random().toString(36).substring(2, 7);
};


/**
 * Function that creates component's lifecycle
 * based on its decorated entity-instance prototype functions
 * @param entityPrototype prototype of the component's entity
 * @param componentId unique identifier of the component
 * @returns {ComponentLifecycle} lifecycle of the component
 */
const getComponentLifecycle = (entityPrototype, componentId): ComponentLifecycle => {
    let lifecycle: ComponentLifecycle = new ComponentLifecycle(componentId);
    Object.keys(entityPrototype).forEach((funcName) => {
        let funcDescriptor = entityPrototype[funcName];
        if (funcDescriptor instanceof Object) {
            if (funcDescriptor.hasOwnProperty('preInitMethod')) {
                lifecycle.setPreInitMethod(funcDescriptor['preInitMethod'])
            } else if (entityPrototype[funcName]['postInitMethod']) {
                lifecycle.setPostInitMethod(funcDescriptor['postInitMethod'])
            } else if (entityPrototype[funcName]['preDestroyMethod']) {
                lifecycle.setPreDestroyMethod(funcDescriptor['preDestroyMethod'])
            } else if (entityPrototype[funcName]['postDestroyMethod']) {
                lifecycle.setPostDestroyMethod(funcDescriptor['postDestroyMethod'])
            }
        }
    });
    return lifecycle;
};

/**
 * Decorator that marks function as pre-init-method
 * for lifecycle's management
 * @param target prototype of entity
 * @param key name of the function
 * @returns {PropertyDescriptor} property descriptor
 */
export function preInit(target: Object, key: string): PropertyDescriptor {
    Object.defineProperty(target, key, {
        value: {
            preInitMethod: target[key]
        }
    });
    return Object.getOwnPropertyDescriptor(target, key);
}

/**
 * Decorator that marks function as post-init-method
 * for lifecycle's management
 * @param target prototype of entity
 * @param key name of the function
 * @returns {PropertyDescriptor} property descriptor
 */
export function postInit(target: Object, key: string): PropertyDescriptor {
    Object.defineProperty(target, key, {
        value: {
            postInitMethod: target[key]
        }
    });
    return Object.getOwnPropertyDescriptor(target, key);

}

/**
 * Decorator that marks function as pre-destroy-method
 * for lifecycle's management
 * @param target prototype of entity
 * @param key name of the function
 * @returns {PropertyDescriptor} property descriptor
 */
export function preDestroy(target: Object, key: string): PropertyDescriptor {
    Object.defineProperty(target, key, {
        value: {
            preDestroyMethod: target[key]
        }
    });
    return Object.getOwnPropertyDescriptor(target, key);
}

/**
 * Decorator that marks function as post-destroy-method
 * for lifecycle's management
 * @param target prototype of entity
 * @param key name of the function
 * @returns {PropertyDescriptor} property descriptor
 */
export function postDestroy(target: Object, key: string): PropertyDescriptor {
    Object.defineProperty(target, key, {
        value: {
            postDestroyMethod: target[key]
        }
    });
    return Object.getOwnPropertyDescriptor(target, key);
}