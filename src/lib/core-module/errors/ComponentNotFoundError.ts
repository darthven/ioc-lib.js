/**
 * Class of error that describes situation when the component
 * cannot be found in application context during dependency lookup process
 */

class ComponentNotFoundError extends Error {
    constructor(componentId: string) {
        super(`Component with id "${componentId}" cannot be found in context`);
        this.name = 'ComponentNotFoundError';
    }
}

export default ComponentNotFoundError;
