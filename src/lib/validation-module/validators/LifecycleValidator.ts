import {isFunction, isObject, isUndefined} from "util";
import Context from "../../core-module/context/Context";
import ComponentLifecycle from "../../core-module/context/ComponentLifecycle";

/**
 * Class that responds for lifecycle's validation of the component
 */
class LifecycleValidator {

    /**
     * Function that checks if lifecycle exists in meta-data
     * from configuration file which describes possible component
     * @param {Object} component parsed object from meta-data
     * @returns {boolean} result of check
     */
    private static lifecycleExistsInConfiguration(component: Object) {
        return !isUndefined(component) && !isUndefined(component['lifecycle']) && isObject(component['lifecycle']);
    }

    /**
     * Function that validates function from component's lifecycle
     * @param method function from component's lifecycle
     * @returns {boolean} result of the validation
     */
    private static validateMethod(method: Function): boolean {
        return !isUndefined(method) && isFunction(method);
    }

    /**
     * Function that returns descriptor of lifecycle's methods
     * @param entity custom class instance
     * @param component parsed object from the metadata
     * @returns {{}} lifecycleMethodsDescriptor descriptor that has methods' names as keys and
     * functions as values
     */
    private static getLifecycleMethodsDesriptor(entity: Object, component: Object): any {
        let lifecycleMethodsDescriptor = {};
        Object.keys(component['lifecycle']).forEach((key) => {
            let method = entity[component['lifecycle'][key]];
            lifecycleMethodsDescriptor[key] = (LifecycleValidator.validateMethod(method)) ? method : null;
        });
        return lifecycleMethodsDescriptor;
    }

    /**
     * Function that validates the whole lifecycle instance of the possible component
     * @param currentContext current application context
     * @param {Object} entity custom class instance
     * @param {Object} component parsed object from the metadata
     */
    public static validateLifecycle(currentContext: Context, entity: Object, component: Object): void {
        let lifecycle = new ComponentLifecycle(component['id']);
        if (LifecycleValidator.lifecycleExistsInConfiguration(component)) {
            const lifecycleMethodsDescriptor = LifecycleValidator.getLifecycleMethodsDesriptor(entity, component);
            lifecycle.setLifecycleMethods(lifecycleMethodsDescriptor);
        }
        currentContext.getContextLifecycle().getComponentLifecycles().set(component['id'], lifecycle);
    }
}

export default LifecycleValidator;