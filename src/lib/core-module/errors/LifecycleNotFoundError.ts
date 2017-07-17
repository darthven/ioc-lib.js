/**
 * Class of error that describes situation when the lifecycle of the component
 * cannot be found in application context during dependency lookup process
 */

class LifecycleNotFoundError extends Error {
    constructor(componentId: string) {
        super(`Lifecycle of the Component with id "${componentId}" cannot be found in context`);
        this.name = 'LifecycleNotFoundError';
    }
}

export default LifecycleNotFoundError;
