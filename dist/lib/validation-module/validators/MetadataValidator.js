"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonfile = require("jsonfile");
var fs = require("fs");
var validation_module_1 = require("../validation-module");
var util_1 = require("util");
/**
 * Length of property's object
 * @type {number}
 */
var PROPERTY_LENGTH = 2;
/**
 * Class that responds for validation of metadata from
 * all configuration files context should receive
 */
var MetadataValidator = (function () {
    function MetadataValidator() {
    }
    /**
     * Method that validates configuration files' existence
     * and their format as JSON
     * @param paths
     * @returns {Array} of parsed objects from metadata
     */
    MetadataValidator.validateConfigurationFiles = function (paths) {
        var configFilesContent = [];
        paths.forEach(function (path) {
            try {
                fs.statSync(path);
                MetadataValidator.logger.debug("[Metadata Validation]: Configuration file by path \"" + path + "\" was found");
                configFilesContent.push({ path: path, content: jsonfile.readFileSync(path) });
            }
            catch (err) {
                MetadataValidator.logger.error("[Metadata Validation]: Cannot read the file by the following path: \"" + path + "\".");
            }
        });
        return configFilesContent;
    };
    /**
     * Method that validates parsed objects from metadata
     * according to the library's specification
     * @param configFilesContent parsed content from metadata
     * @returns {Array} configuration objects (special objects
     * on the highest level of the metadata hierarchy)
     */
    MetadataValidator.validateConfigurationObjects = function (configFilesContent) {
        var configuratioObjects = [];
        configFilesContent.forEach(function (file) {
            var configurationObject = file['content']['configuration'];
            if (!configurationObject) {
                MetadataValidator.logger.error("[Metadata Validation]: Configuration object from metadata in file \"" + file['path'] + "\" does not exist");
                throw new validation_module_1.MetadataValidationError(file['path']);
            }
            configuratioObjects.push({ filePath: file['path'], configuration: configurationObject });
        });
        return configuratioObjects;
    };
    /**
     * Method that validates arrays of possible components
     * @param configurationObjects special objects
     * on the highest level of the metadata hierarchy
     */
    MetadataValidator.validateComponentsArray = function (configurationObjects) {
        var componentsArrays = [];
        configurationObjects.forEach(function (configObj) {
            var componentsArray = configObj['configuration']['components'];
            if (!componentsArray) {
                MetadataValidator.logger.error("[Metadata Validation]: Components' array from metadata in file \"" + configObj['filePath'] + "\" does not exist");
                throw new validation_module_1.MetadataValidationError(configObj['filePath']);
            }
            var componentsArrayDescriptor = { filePath: configObj['filePath'], components: componentsArray };
            MetadataValidator.validateConfigComponent(componentsArrayDescriptor);
        });
    };
    /**
     * Method that validates the object instance of possible component
     * @param componentsArrayDescriptor descriptor of an array of possible components
     * that stores information about its content and the path to the configuration file
     */
    MetadataValidator.validateConfigComponent = function (componentsArrayDescriptor) {
        componentsArrayDescriptor['components'].forEach(function (comp, index) {
            if (!util_1.isObject(comp)) {
                MetadataValidator.logger.error("[Metadata Validation]: Component[" + index + "] from metadata in file \"" + componentsArrayDescriptor['filePath'] + "\" is not an object");
                throw new validation_module_1.MetadataValidationError(componentsArrayDescriptor['filePath']);
            }
            var componentDescriptor = { index: index, instance: comp, filePath: componentsArrayDescriptor['filePath'] };
            MetadataValidator.validateConfigLifecycle(componentDescriptor);
            MetadataValidator.validateConfigScope(componentDescriptor);
            MetadataValidator.validateConfigProperties(componentDescriptor);
        });
    };
    /**
     * Method that validates the existence of lifecycle's method in the lifecycle object
     * @param lifecycle object
     * @param methodName name of method
     * @returns {boolean} validation result
     */
    MetadataValidator.configLifecycleHasMethod = function (lifecycle, methodName) {
        return lifecycle.hasOwnProperty(methodName) && util_1.isString(lifecycle[methodName]);
    };
    /**
     * Method that validated lifecycle object according to the library's specification
     * @param componentDescriptor descriptor that stores information about
     * component object's position in the array of possible components, its instance and
     * path to the configuration file
     */
    MetadataValidator.validateConfigLifecycle = function (componentDescriptor) {
        var configLifecycle = componentDescriptor['instance']['lifecycle'];
        if (!configLifecycle) {
            MetadataValidator.logger.warn("[Metadata Validation]: Component[" + componentDescriptor['index'] + "] from metadata in file \"" + componentDescriptor['filePath'] + "\" has no lifecycle object");
        }
        else {
            if (!util_1.isObject(configLifecycle)) {
                MetadataValidator.logger.error("[Metadata Validation]: Component[" + componentDescriptor['index'] + "] from metadata in file \"" + componentDescriptor['filePath'] + "\" has invalid lifecycle object");
                throw new validation_module_1.MetadataValidationError(componentDescriptor['filePath']);
            }
            var lifecycleMethods = Object.keys(configLifecycle);
            lifecycleMethods.forEach(function (method) {
                var methodExists = MetadataValidator.configLifecycleHasMethod(configLifecycle, method);
                if (!methodExists) {
                    MetadataValidator.logger.error("[Metadata Validation]: Component[" + componentDescriptor['index'] + "] from metadata in file \"" + componentDescriptor['filePath'] + "\" has invalid lifecycle object");
                    throw new validation_module_1.MetadataValidationError(componentDescriptor['filePath']);
                }
            });
            MetadataValidator.logger.debug("[Metadata Validation]: Lifecycle of the Component[" + componentDescriptor['index'] + "] from metadata in file \"" + componentDescriptor['filePath'] + "\" is successfully validated");
        }
    };
    /**
     * Method that validates property object's name existence and type
     * @param property object
     * @returns {boolean|Object} validation result
     */
    MetadataValidator.configPropertyHasName = function (property) {
        return property.hasOwnProperty('name') && util_1.isString(property['name']);
    };
    /**
     * Method that validates property object's value existence and type
     * @param property object
     * @returns {boolean|Object} validation result
     */
    MetadataValidator.configPropertyHasValue = function (property) {
        return property.hasOwnProperty('value') && !util_1.isNullOrUndefined(property['value']);
    };
    /**
     * Method that validates property object's reference existence and type
     * @param property object
     * @returns {boolean|Object} validation result
     */
    MetadataValidator.configPropertyHasReference = function (property) {
        return property.hasOwnProperty('reference') && util_1.isString(property['reference']);
    };
    /**
     * Method that validated properties' array according to the library's specification
     * @param componentDescriptor descriptor that stores information about
     * component object's position in the array of possible components, its instance and
     * path to the configuration file
     */
    MetadataValidator.validateConfigProperties = function (componentDescriptor) {
        var configProperties = componentDescriptor['instance']['properties'];
        if (!util_1.isArray(configProperties)) {
            MetadataValidator.logger.error("[Metadata Validation]: Component[" + componentDescriptor['index'] + "] from metadata in file \"" + componentDescriptor['filePath'] + "\"has invalid properties' instance");
            throw new validation_module_1.MetadataValidationError(componentDescriptor['filePath']);
        }
        configProperties.forEach(function (prop) {
            if (Object.keys(prop).length === PROPERTY_LENGTH && MetadataValidator.configPropertyHasName(prop)) {
                if (MetadataValidator.configPropertyHasValue(prop) || MetadataValidator.configPropertyHasReference(prop)) {
                    MetadataValidator.logger.debug("[Metadata Validation]: Property \"" + prop['name'] + "\" of the Component[" + componentDescriptor['index'] + "] from metadata in file \"" + componentDescriptor['filePath'] + " is successfully validated");
                }
                else {
                    MetadataValidator.logger.error("[Metadata Validation]: Component[" + componentDescriptor['index'] + "] from metadata in file \"" + componentDescriptor['filePath'] + " has invalid property \"" + prop['name'] + "\"");
                    throw new validation_module_1.MetadataValidationError(componentDescriptor['filePath']);
                }
            }
        });
    };
    /**
     * Method that validated properties' scope according to the library's specification
     * @param componentDescriptor descriptor that stores information about
     * component object's position in the array of possible components, its instance and
     * path to the configuration file
     */
    MetadataValidator.validateConfigScope = function (componentDescriptor) {
        var configScope = componentDescriptor['instance']['scope'];
        if (configScope) {
            if (!util_1.isString(configScope) || !['singleton', 'prototype'].includes(configScope)) {
                MetadataValidator.logger.error("[Metadata Validation]: Component[" + componentDescriptor['index'] + "] from metadata in file \"" + componentDescriptor['filePath'] + "\" has invalid scope");
                throw new validation_module_1.MetadataValidationError(componentDescriptor['filePath']);
            }
            else {
                MetadataValidator.logger.debug("[Metadata Validation]: Scope of the Component[" + componentDescriptor['index'] + "] from metadata in file \"" + componentDescriptor['filePath'] + " is successfully validated");
            }
        }
        else {
            MetadataValidator.logger.debug("[Metadata Validation]: Scope of the Component[" + componentDescriptor['index'] + "] from metadata in file \"" + componentDescriptor['filePath'] + "\" will be set to SINGLETON as default");
        }
    };
    /**
     * Main method that validates all metadata from configuration files
     * @param paths to the configuration files
     */
    MetadataValidator.validateMetadata = function (paths) {
        MetadataValidator.logger.info('[Metadata Validation]: Metadata validation process is starting...');
        var configFilesContent = MetadataValidator.validateConfigurationFiles(paths);
        var configurationKeywords = MetadataValidator.validateConfigurationObjects(configFilesContent);
        MetadataValidator.validateComponentsArray(configurationKeywords);
        MetadataValidator.logger.info('[Metadata Validation]: Metadata validation process was finished...');
    };
    /**
     * Logger for logging all important events
     * during metadata validation
     */
    MetadataValidator.logger = require('log4js').getLogger();
    return MetadataValidator;
}());
exports.default = MetadataValidator;
