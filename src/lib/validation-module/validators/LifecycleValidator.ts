import {isFunction, isObject, isUndefined} from "util";
import ComponentLifecycle from "../../core-module/context/ComponentLifecycle";
/**
 * Created by kokh0716 on 6/26/2017.
 */

class LifecycleValidator {

    private static logger = require('log4js').getLogger();

    private static lifecycleExistsInConfiguration(component: Object) {
        return !isUndefined(component) && !isUndefined(component['lifecycle']) && isObject(component['lifecycle']);
    }

    private static validateInitMethod(initMethod: any): boolean {
        return !isUndefined(initMethod) && isFunction(initMethod);
    }

    private static validateAfterPropertiesWereSetMethod(afterPropertiesWereSetMethod: any): boolean {
        return !isUndefined(afterPropertiesWereSetMethod) && isFunction(afterPropertiesWereSetMethod);
    }

    private static validateDestroyMethod(destroyMethod: any): boolean {
        return !isUndefined(destroyMethod) && isFunction(destroyMethod);
    }

    private static setDafaultInitMethod(lifecycle: ComponentLifecycle, component: Object): void {
        LifecycleValidator.logger.warn(`No init-method was detected in component with id "${component['id']}"`);
        lifecycle.setInitMethod(() => {
            LifecycleValidator.logger.debug(`Default init-method is called to the component with id "${component['id']}"`)
        });
    }

    private static setDefaultAfterPropertiesWereSetMethod(lifecycle: ComponentLifecycle, component: Object): void {
        LifecycleValidator.logger.warn(`No after-properties-set-method was detected in component with id "${component['id']}"`);
        lifecycle.setAfterPropertiesWereSetMethod(() => {
            LifecycleValidator.logger.debug(`Default after-properties-set-method is called to the component with id "${component['id']}"`)
        });
    }

    private static setDafaultDestroyMethod(lifecycle: ComponentLifecycle, component: Object): void {
        LifecycleValidator.logger.warn(`No  destroy-method  was detected in component with id "${component['id']}"`);
        lifecycle.setDestroyMethod(() => {
            LifecycleValidator.logger.debug(`Default destroy-method is called to the component with id "${component['id']}"`)
        });
    }

    public static validateLifecycle(entity: Object, component: Object): ComponentLifecycle {
        let initMethod, afterPropertiesWereSetMethod, destroyMethod;
        let lifecycle = new ComponentLifecycle();
        lifecycle.setComponentId(component['id']);
        if (this.lifecycleExistsInConfiguration(component)) {
            initMethod = entity[component['lifecycle'].initMethod];
            afterPropertiesWereSetMethod = entity[component['lifecycle'].afterPropertiesWereSetMethod];
            destroyMethod = entity[component['lifecycle'].destroyMethod];
            if (!this.validateInitMethod(initMethod)) {
                this.setDafaultInitMethod(lifecycle, component);
            } else {
                lifecycle.setInitMethod(initMethod);
            }
            if (!this.validateAfterPropertiesWereSetMethod(afterPropertiesWereSetMethod)) {
                this.setDefaultAfterPropertiesWereSetMethod(lifecycle, component);
            } else {
                lifecycle.setAfterPropertiesWereSetMethod(afterPropertiesWereSetMethod);
            }
            if (!this.validateDestroyMethod(destroyMethod)) {
                this.setDafaultDestroyMethod(lifecycle, component);
            } else {
                lifecycle.setDestroyMethod(destroyMethod);
            }
        } else {
            this.setDafaultInitMethod(lifecycle, component);
            this.setDefaultAfterPropertiesWereSetMethod(lifecycle, component);
            this.setDafaultDestroyMethod(lifecycle, component);
        }
        return lifecycle;
    }
}

export default LifecycleValidator;