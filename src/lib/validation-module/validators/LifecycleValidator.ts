import {isFunction, isObject, isUndefined} from "util";
import {ComponentLifecycle} from "../../core-module/core-module";

/**
 * Class that responds for lifecycle's validation of the component
 */
class LifecycleValidator {

    /**
     * Logger for logging all events during lifecycle's validation process
     */
    private static logger = require('log4js').getLogger();

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
     * Function that validates init-method from meta-data
     * @param initMethod method that will be called before
     * component's registration in the application context
     * @returns {boolean} result of the validation
     */
    private static validateInitMethod(initMethod: any): boolean {
        return !isUndefined(initMethod) && isFunction(initMethod);
    }

    /**
     * Function that validates method which will be call after setting
     * all properties to the possible component from meta-data
     * @param afterPropertiesWereSetMethod method that will be called after
     * all properties to the possible component from meta-data
     * @returns {boolean} result of the validation
     */
    private static validateAfterPropertiesWereSetMethod(afterPropertiesWereSetMethod: any): boolean {
        return !isUndefined(afterPropertiesWereSetMethod) && isFunction(afterPropertiesWereSetMethod);
    }

    /**
     * Function that validates destroy-method from meta-data
     * @param destroyMethod method that will be called before
     * removing component from the application context
     * @returns {boolean} result of the validation
     */
    private static validateDestroyMethod(destroyMethod: any): boolean {
        return !isUndefined(destroyMethod) && isFunction(destroyMethod);
    }

    /**
     * Function that sets default library's init-method
     * to the lifecycle instance of the component
     * @param {ComponentLifecycle} lifecycle's instance of the component
     * @param {Object} component parsed object from the meta-data
     */
    private static setDafaultInitMethod(lifecycle: ComponentLifecycle, component: Object): void {
        LifecycleValidator.logger.warn(`Lifecycle Validation: No init-method was detected in component with id "${component['id']}"`);
        lifecycle.setInitMethod(() => {
            LifecycleValidator.logger.debug(`Default init-method is called to the component with id "${component['id']}"`)
        });
    }

    /**
     * Function that sets default library's after-properties-were-set-method
     * to the lifecycle instance of the component
     * @param {ComponentLifecycle} lifecycle's instance of the component
     * @param {Object} component parsed object from the meta-data
     */
    private static setDefaultAfterPropertiesWereSetMethod(lifecycle: ComponentLifecycle, component: Object): void {
        LifecycleValidator.logger.warn(`Lifecycle Validation: No after-properties-set-method was detected in component with id "${component['id']}"`);
        lifecycle.setAfterPropertiesWereSetMethod(() => {
            LifecycleValidator.logger.debug(`Default after-properties-set-method is called to the component with id "${component['id']}"`)
        });
    }

    /**
     * Function that sets default library's destroy-method
     * to the lifecycle instance of the component
     * @param {ComponentLifecycle} lifecycle's instance of the component
     * @param {Object} component parsed object from the meta-data
     */
    private static setDafaultDestroyMethod(lifecycle: ComponentLifecycle, component: Object): void {
        LifecycleValidator.logger.warn(`Lifecycle Validation: No destroy-method  was detected in component with id "${component['id']}"`);
        lifecycle.setDestroyMethod(() => {
            LifecycleValidator.logger.debug(`Default destroy-method is called to the component with id "${component['id']}"`)
        });
    }

    /**
     * Function that validates the whole lifecycle instance
     * of the possible component
     * @param {Object} entity custom class instance
     * @param {Object} component parsed object from the meta-data
     * @returns {ComponentLifecycle} lifecycle's instance of the component
     */
    public static validateLifecycle(entity: Object, component: Object): ComponentLifecycle {
        let initMethod, afterPropertiesWereSetMethod, destroyMethod;
        let lifecycle = new ComponentLifecycle();
        lifecycle.setComponentId(component['id']);
        if (LifecycleValidator.lifecycleExistsInConfiguration(component)) {
            initMethod = entity[component['lifecycle'].initMethod];
            afterPropertiesWereSetMethod = entity[component['lifecycle'].afterPropertiesWereSetMethod];
            destroyMethod = entity[component['lifecycle'].destroyMethod];
            if (!LifecycleValidator.validateInitMethod(initMethod)) {
                LifecycleValidator.setDafaultInitMethod(lifecycle, component);
            } else {
                lifecycle.setInitMethod(initMethod);
            }
            if (!LifecycleValidator.validateAfterPropertiesWereSetMethod(afterPropertiesWereSetMethod)) {
                LifecycleValidator.setDefaultAfterPropertiesWereSetMethod(lifecycle, component);
            } else {
                lifecycle.setAfterPropertiesWereSetMethod(afterPropertiesWereSetMethod);
            }
            if (!LifecycleValidator.validateDestroyMethod(destroyMethod)) {
                LifecycleValidator.setDafaultDestroyMethod(lifecycle, component);
            } else {
                lifecycle.setDestroyMethod(destroyMethod);
            }
        } else {
            LifecycleValidator.setDafaultInitMethod(lifecycle, component);
            LifecycleValidator.setDefaultAfterPropertiesWereSetMethod(lifecycle, component);
            LifecycleValidator.setDafaultDestroyMethod(lifecycle, component);
        }
        return lifecycle;
    }
}

export default LifecycleValidator;