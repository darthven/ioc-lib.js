/**
 * Created by kokh0716 on 6/26/2017.
 */
class PropertyValidationError extends Error {
    constructor(componentId) {
        const message = `Component with id "${componentId}" contains wrong property.`;
        super(message);
        this.name = 'ComponentNotFoundError';
    }
}

export default PropertyValidationError;
