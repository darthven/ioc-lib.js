/**
 * Created by kokh0716 on 6/26/2017.
 */
import Property from '../../core-module/context/Property'

class PropertyValidator {

    private static validateName(property: Property): boolean {
        return property.getName() && property.getName() != null;
    }

    private static validateValue(property: Property): boolean {
        return property.getValue() && property.getValue() != null;
    }

    private static validateReference(property: Property): boolean {
        return property.getReference() && property.getReference() != null;
    }

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
