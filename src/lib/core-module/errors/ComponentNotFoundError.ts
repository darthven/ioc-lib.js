/**
 * Class of error that describes situation when the component
 * cannot be found in application context during dependency lookup process
 */

class ComponentNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ComponentNotFoundError';
    }
}

export default ComponentNotFoundError;
