/**
 * Class of error that describes situation
 * when property's validation was failed
 */
class PropertyValidationError extends Error {
    constructor(componentId: string) {
        const message = `Component with id "${componentId}" contains wrong property.`;
        super(message);
        this.name = 'PropertyValidationError';
    }
}

export default PropertyValidationError;
