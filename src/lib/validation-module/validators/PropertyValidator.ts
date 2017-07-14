import {isObject, isString} from "util";

/**
 * Class that responds for validation component's properties
 */
class PropertyValidator {

    /**
     * Function that validates property's name
     * @param {Object} property of the component
     * @returns {boolean} validation result
     */
    private static validateName(property: Object): boolean {
        return property['name'] != null && isString(property['name']) ;
    }

    /**
     * Function that validates property's value
     * @param {Object} property of the component
     * @returns {boolean} validation result
     */
    private static validateValue(property: Object): boolean {
        return property['value'] != null;
    }

    /**
     * Function that validates property's reference
     * @param {Object} property of the component
     * @returns {boolean} validation result
     */
    private static validateReference(property: Object): boolean {
        return property['reference'] != null && isObject(property['reference']);
    }

    /**
     * Function that validates all properties of the component
     * @param {Object[]} properties of the component
     * @returns {boolean} validation result
     */
    public static validateProperties(properties: Object[]): boolean {
        properties.forEach((property) => {
            if (!property['value']) {
                if (!PropertyValidator.validateName(property) ||
                    !PropertyValidator.validateReference(property)) {
                    return false;
                }
            } else if (property['value']) {
                if (!PropertyValidator.validateName(property) ||
                    !PropertyValidator.validateValue(property)) {
                    return false;
                }
            }
        });
        return true;
    }
}

export default PropertyValidator;
