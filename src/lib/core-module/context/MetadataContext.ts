import {Scope, Property, Component} from '../core-module'
import {MetadataValidator, PropertyValidator, LifecycleValidator} from "../../validation-module/validation-module";
import jsonfile = require('jsonfile');
import PropertyValidationError from "../../validation-module/errors/PropertyValidationError";
import Context from "./Context";

/**
 * Class that responds for creation and management process of the components,
 * for updating and closing application context in safe-mode,
 * simple representation of Inversion of Control Container based on metadata from
 * configuration files in JSON-format
 */
class MetadataContext extends Context {

    /**
     * Paths to the configuration files with meta-data which will be sent to
     * the application context for further analyze and validation
     */
    private configs: string[];

    /**
     * Default context constructor for decorator-based usage
     */
    constructor();

    /**
     * Context constructor for configuration-base usage
     * @param configs paths to the configuration files
     */
    constructor(configs: string[]);

    /**
     * Context constructor
     * @param configs paths to the configuration files
     */
    constructor(configs?: string[]) {
        super();
        if (configs) {
            MetadataValidator.validateMetadata(configs);
            this.configs = configs;
            this.registerComponentsInContext();
            MetadataContext.logger.info('Context was initialized');
        }
    }

    /**
     * Function that reads configuration files in JSON format
     * and retrieves an array of objects
     * @returns {Object[]} objects which will be analyzed by application context
     * on the next step of the initializing process
     */
    private parseMetadataFromConfigurationFile(): Object[] {
        let objects = [];
        this.configs.forEach((config) => {
            let configFile = jsonfile.readFileSync(config).configuration;
            objects.push({configName: config, config: configFile});
        });
        return objects;
    }

    /**
     * Function that retrieves properties' values
     * of the object that was retrieved from meta-data
     * @param {Object} configComponent parsed object from configuration file
     * @returns {Property[]} array of properties (with values)
     */
    private getPropertyValuesFromConfiguration(configComponent: Object): Property[] {
        let propertiesFromContext = configComponent['properties'];
        let properties = [];
        if (propertiesFromContext) {
            propertiesFromContext.forEach((prop) => {
                let property = new Property(prop.name);
                if (prop['value']) {
                    property.setValue(prop.value);
                    properties.push(property);
                }
            });
        }
        return properties;
    }

    /**
     * Function that retrieves properties' references
     * of the current object to other objects by unique identifier
     * that was retrieved from meta-data
     * @param {Object} configComponent parsed object from configuration file
     * @returns {Property[]} array of properties (with references to other objects by
     * unique identifiers)
     */
    private getPropertyReferencesFromConfiguration(configComponent: Object): Property[] {
        let propertiesFromContext = configComponent['properties'];
        let properties = [];
        if (propertiesFromContext) {
            propertiesFromContext.forEach((prop) => {
                let property = new Property(prop.name);
                if (prop['reference']) {
                    property.setReference(prop.reference);
                    properties.push(property);
                }
            });
        }
        return properties;
    }

    /**
     * Function that defines the scope of the object from meta-data
     * (SINGLETON scope means component based on this object will be created
     * once in the application context, PROTOTYPE scope means component can be
     * created several times as the copies of the one main instance)
     * @param {Object} configComponent parsed object from configuration file
     * @returns {Scope} scope of the parsed object (SINGLETON by default)
     */
    private defineComponentScope(configComponent: Object): number {
        if (configComponent['scope'] === 'singleton') {
            return Scope.SINGLETON;
        } else if (configComponent['scope'] === 'prototype') {
            return Scope.PROTOTYPE;
        }
        return Scope.SINGLETON;
    }

    /**
     * Function that sets properties (values) to the possible component
     * in the application context (basic step of registering component in the context)
     * and executes method before its initialization
     * @param {Object[]} configComponents parsed objects from meta-data
     * @param {Map<string, Component>} basicComponents unregistered components in their basic form
     * (without values, without references)
     */
    private setBasicPropertiesToComponents(configComponents: Object[], basicComponents: Map<string, Component>) {
        configComponents.forEach((comp) => {
            const classPath = `../../../../../../${comp['classPath']}`;
            const entity = require(classPath).default.prototype;
            let lifecycle = LifecycleValidator.validateLifecycle(entity, comp);
            lifecycle.callInitMethod();
            let component = new Component(comp['id'],
                comp['name'], comp['classPath'], this.defineComponentScope(comp), lifecycle);
            let properties = this.getPropertyValuesFromConfiguration(comp);
            let propertiesAreValid = PropertyValidator.validateProperties(properties);
            if (propertiesAreValid) {
                component.setProperties(properties);
                basicComponents.set(comp['id'], Object.assign(component, entity));
            } else {
                throw new PropertyValidationError(comp['id']);
            }
        });
    }

    /**
     * Function that sets properties (references) to the possible component
     * in the application context (last step of registering component in the context)
     * and executes method after setting all properties to it
     * @param {Object[]} configComponents parsed objects from meta-data
     * @param {Map<string, Component>} basicComponents unregistered components in their basic form
     * (with values, without references)
     */
    private setReferencesToComponents(configComponents: Object[], basicComponents: Map<string, Component>): void {
        basicComponents.forEach((component) => {
            configComponents.forEach((comp) => {
                const references = this.getPropertyReferencesFromConfiguration(comp);
                const currentProperties = component.getProperties();
                component.setProperties(currentProperties.concat(references));
                component.getLifecycle().callAfterPropertiesWereSetMethod();
            });
        });
    }

    /**
     * Function that returns parsed objects from meta-data
     * without duplicates by unique identifiers
     * @returns {Object[]} parsed objects from meta-data without duplicates
     */
    private getUniqueConfigComponents(): Object[] {
        let configComponents = [];
        const objects = this.parseMetadataFromConfigurationFile();
        objects.forEach(object => {
            object['config'].components.forEach(component => {
                if (!configComponents.find(elem => elem.id === component.id)) {
                    configComponents.push(component);
                }
            });
        });
        return configComponents;
    }

    /**
     * Function that returns stable parsed objects from meta-data
     * @returns {Object[]} array of parsed objects
     */
    private getConfigComponents(): Object[] {
        return this.getUniqueConfigComponents();
    }


    /**
     * Function that registers components in the application context
     */
    private registerComponentsInContext(): void {
        let basicComponents = new Map<string, Component>();
        let configComponents = this.getConfigComponents();
        this.setBasicPropertiesToComponents(configComponents, basicComponents);
        this.setReferencesToComponents(configComponents, basicComponents);
        this.components = basicComponents;
    }

    /**
     * Function that updates context. Can be called if you need to update context
     * after updating meta-data in configuration files
     */
    public updateContext(): void {
        this.registerComponentsInContext();
    }
}

export default MetadataContext