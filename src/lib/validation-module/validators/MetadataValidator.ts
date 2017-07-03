import jsonfile = require('jsonfile');
import path = require('path');
import fs = require('fs');
import {MetadataValidationError} from "../validation-module";
import {isArray, isNullOrUndefined, isObject, isString} from "util";

class MetadataValidator {

    private static logger = require('log4js').getLogger();

    private static validateConfigurationFiles(paths: string[]): Object[] {
        let configFilesContent = [];
        paths.forEach((path) => {
            try {
                fs.statSync(path);
                MetadataValidator.logger.debug(`Configuration file by path "${path}" was found`);
                configFilesContent.push({path: path, content: jsonfile.readFileSync(path)});
            } catch (err) {
                MetadataValidator.logger.error(`Cannot read the file by the following path: "${path}".`);
            }
        });
        return configFilesContent;
    }

    private static validateConfigurationObjects(configFiles: Object[]): Object[] {
        let configuratioObjects = [];
        configFiles.forEach((file) => {
            let configurationObject = file['content']['configuration'];
            if (!configurationObject) {
                MetadataValidator.logger.error(`Configuration object from metadata in file "${file['path']}" does not exist`);
                throw new MetadataValidationError(file['path']);
            }
            configuratioObjects.push({filePath: file['path'], configuration: configurationObject});
        });
        return configuratioObjects;
    }

    private static validateComponentsArray(configurationObjects: Object[]): Object[] {
        let componentsArrays = [];
        configurationObjects.forEach((configObj) => {
            let componentsArray = configObj['configuration']['components'];
            if (!componentsArray) {
                MetadataValidator.logger.error(`Components' array from metadata in file "${configObj['filePath']}" does not exist`);
                throw new MetadataValidationError(configObj['filePath']);
            }
            let componentsArrayDescriptor = {filePath: configObj['filePath'], components: componentsArray};
            MetadataValidator.validateConfigComponent(componentsArrayDescriptor);
        });
        return componentsArrays;
    }

    private static validateConfigComponent(componentsArrayDescriptor: Object): void {
        componentsArrayDescriptor['components'].forEach((comp, index) => {
            if (!isObject(comp)) {
                MetadataValidator.logger.error(`Component[${index}] from metadata in file "${componentsArrayDescriptor['filePath']}" is not an object`);
                throw new MetadataValidationError(componentsArrayDescriptor['filePath']);
            }
            let componentDescriptor = {index: index, instance: comp, filePath: componentsArrayDescriptor['filePath']};
            MetadataValidator.validateConfigLifecycle(componentDescriptor);
            MetadataValidator.validateConfigScope(componentDescriptor);
            MetadataValidator.validateConfigProperties(componentDescriptor);
        });
    }

    private static validateConfigLifecycle(componentDescriptor: Object): void {
        let configLifecycle = componentDescriptor['instance']['lifecycle'];
        if (!configLifecycle) {
            MetadataValidator.logger.warn(`Component[${componentDescriptor['index']}] from metadata in file "${componentDescriptor['filePath']}" 
            has no lifecycle object`);
        } else {
            if (!isObject(configLifecycle)) {
                MetadataValidator.logger.error(`Component[${componentDescriptor['index']}] from metadata in file "${componentDescriptor['filePath']}" 
            has invalid lifecycle object`);
                throw new MetadataValidationError(componentDescriptor['filePath']);
            }
            let lifecycleMethods = Object.keys(configLifecycle);
            console.log('LIFECYCLE METHODS ', lifecycleMethods);
            if (lifecycleMethods.length <= 3 && lifecycleMethods.includes('initMethod') ||
                lifecycleMethods.includes('afterPropertiesWereSetMethod') || lifecycleMethods.includes('destroyMethod')) {
                MetadataValidator.logger.debug(`Lifecycle of the Component[${componentDescriptor['index']}] from metadata in file "${componentDescriptor['filePath']}" 
            is successfully validated`);
            } else {
                MetadataValidator.logger.error(`Component[${componentDescriptor['index']}] from metadata in file "${componentDescriptor['filePath']}" 
            has invalid lifecycle object`);
                throw new MetadataValidationError(componentDescriptor['filePath']);
            }
        }
    }

    private static validateConfigProperties(componentDescriptor: Object): void {
        let configProperties = componentDescriptor['instance']['properties'];
        if (!isArray(configProperties)) {
            MetadataValidator.logger.error(`Component[${componentDescriptor['index']}] from metadata in file "${componentDescriptor['filePath']}" 
            has invalid properties' instance`);
            throw new MetadataValidationError(componentDescriptor['filePath']);
        }
        configProperties.forEach((prop) => {
            if (Object.keys(prop).length === 2 && MetadataValidator.configPropertyHasName(prop)) {
                if (MetadataValidator.configPropertyHasValue(prop) || MetadataValidator.configPropertyHasReference(prop)) {
                    MetadataValidator.logger.debug(`Property "${prop['name']}" of the Component[${componentDescriptor['index']}] 
                    from metadata in file "${componentDescriptor['filePath']} is successfully validated`)
                } else {
                    MetadataValidator.logger.error(`Component[${componentDescriptor['index']}] from metadata in file "${componentDescriptor['filePath']}
                    has invalid property "${prop['name']}"`);
                    throw new MetadataValidationError(componentDescriptor['filePath']);
                }
            }
        });
    }

    private static configPropertyHasName(property: Object): boolean {
        return property.hasOwnProperty('name') && isString(property['name']);
    }

    private static configPropertyHasValue(property: Object): boolean {
        return property.hasOwnProperty('value') && !isNullOrUndefined(property['value']);
    }

    private static configPropertyHasReference(property: Object): boolean {
        return property.hasOwnProperty('reference') && isString(property['reference']);
    }

    private static validateConfigScope(componentDescriptor: Object): string {
        let configScope = null;

        return configScope;
    }

    public static validateMetadata(paths: string[]): void {
        const configFilesContent = MetadataValidator.validateConfigurationFiles(paths);
        const configurationKeywords = MetadataValidator.validateConfigurationObjects(configFilesContent);
        const components = MetadataValidator.validateComponentsArray(configurationKeywords);
    }

}

export default MetadataValidator;