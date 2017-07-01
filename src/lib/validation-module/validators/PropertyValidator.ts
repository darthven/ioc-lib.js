import {Property} from '../../core-module/core-module'
import {isObject, isString} from "util";

/**
 * Class that responds for validation component's properties
 */
class PropertyValidator {

    /**
     * Function that validates property's name
     * @param {Property} property of the component
     * @returns {boolean} validation result
     */
    private static validateName(property: Property): boolean {
        return property.getName() != null && isString(property.getName()) ;
    }

    /**
     * Function that validates property's value
     * @param {Property} property of the component
     * @returns {boolean} validation result
     */
    private static validateValue(property: Property): boolean {
        return property.getValue() != null;
    }

    /**
     * Function that validates property's reference
     * @param {Property} property of the component
     * @returns {boolean} validation result
     */
    private static validateReference(property: Property): boolean {
        return property.getReference() != null && isObject(property.getReference());
    }

    /**
     * Function that validates all properties of the component
     * @param {Property[]} properties of the component
     * @returns {boolean} validation result
     */
    public static validateProperties(properties: Property[]): boolean {
        properties.forEach((property) => {
            if (!property.getValue()) {
                if (!this.validateName(property) || !this.validateReference(property)) {
                    return false;
                }
            } else if (property.getValue()) {
                if (!this.validateName(property) || !this.validateValue(property)) {
                    return false;
                }
            }
        });
        return true;
    }
}

export default PropertyValidator;
