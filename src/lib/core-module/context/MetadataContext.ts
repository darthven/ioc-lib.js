import Context from "./Context";
import {default as Component, Scope} from "./Component";
import {
    MetadataValidator,
    PropertyValidator,
    LifecycleValidator,
    PropertyValidationError
} from "../../validation-module/validation-module";
import {LOGGER} from "../../utils/logger";
const jsonfile = require('jsonfile');


const APPLICATION_ROOT_DIRECTORY = require('app-root-dir').get();

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
            LOGGER.info('[MetadataContext]: Context was initialized');
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
     * @param {Object} entity custom class instance
     * @returns {Object[]} array of properties (with values)
     */
    private getPropertiesFromConfiguration(configComponent: Object, entity: Object): Object[] {
        let propertiesFromContext = configComponent['properties'];
        let properties = [];
        if (propertiesFromContext) {
            propertiesFromContext.forEach((prop) => {
                let entityPropertyNames = Object.getOwnPropertyNames(entity['default']['prototype']);
                let propertyName = entityPropertyNames.find(propName => propName === prop['name']);
                if (prop['value'] && propertyName) {
                    properties.push({
                        name: prop['name'],
                        value: prop['value']
                    });
                } else if (prop['reference'] && propertyName) {
                    properties.push({
                        name: prop['name'],
                        reference: prop['reference']
                    });
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
     * (without values, without references)
     */
    private setBasicPropertiesToComponents(configComponents: Object[]) {
        configComponents.forEach((configComp) => {
            const classPath = `${APPLICATION_ROOT_DIRECTORY}/${configComp['classPath']}`;
            const entityClass = require(classPath);
            const entityPrototype = entityClass.default.prototype;
            const entity = Object.create(entityPrototype);
            LifecycleValidator.validateLifecycle(this, entityPrototype, configComp);
            const componentLifecycle = this.getContextLifecycle().getComponentLifecycles().get(configComp['id']);
            componentLifecycle.callPreInitMethod();
            const component = new Component(configComp['id'],
                configComp['name'], configComp['classPath'], this.defineComponentScope(configComp));
            const properties = this.getPropertiesFromConfiguration(configComp, entityClass);
            const propertiesAreValid = PropertyValidator.validateProperties(properties);
            if (propertiesAreValid) {
                properties.forEach((prop) => {
                    if (prop['value']) {
                        entity[prop['name']] = prop['value'];
                    } else {
                        entity[prop['name']] = null;
                    }
                });
                componentLifecycle.callBeforePropertiesWillBeSetMethod();
                component.setEntityInstance(entity);
                this.components.set(configComp['id'], component);
                componentLifecycle.callPostInitMethod();
            } else {
                throw new PropertyValidationError(configComp['id']);
            }
        });
    }

    /**
     * Function that sets properties (references) to the possible component
     * in the application context (last step of registering component in the context)
     * and executes method after setting all properties to it
     * @param {Object[]} configComponents parsed objects from meta-data
     * (with values, without references)
     */
    private setReferencesToComponents(configComponents: Object[]): void {
        this.components.forEach((component) => {
            const componentLifecycle = this.getContextLifecycle().getComponentLifecycles().get(component.getId());
            const entityClass = require(`${APPLICATION_ROOT_DIRECTORY}/${component.getClassPath()}`);
            configComponents.forEach((comp) => {
                const properties = this.getPropertiesFromConfiguration(comp, entityClass);
                properties.forEach((prop) => {
                    if (prop['reference']) {
                        const injectedComponent = this.getComponentEntityInstance(prop['reference']);
                        component.getEntityInstance()[prop['name']] = injectedComponent;
                    }
                });
            });
            componentLifecycle.callAfterPropertiesWereSetMethod();
        });
    }

    /**
     * Function that returns parsed objects from metadata
     * without duplicates by unique identifiers
     * @returns {Object[]} parsed objects from metadata without duplicates
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
        let configComponents = this.getConfigComponents();
        this.setBasicPropertiesToComponents(configComponents);
        this.setReferencesToComponents(configComponents);
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