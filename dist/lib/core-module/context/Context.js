"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_module_1 = require("../core-module");
var _ = require("lodash");
/**
 * Class that responds for creation and management process of the components,
 * for updating and closing application context in safe-mode,
 * simple representation of Inversion of Control Container
 */
var Context = (function () {
    function Context() {
    }
    /**
     * Function that removes component from application context by unique identifier
     * @param {string} componentId unique identifier of the component
     * @returns {boolean}
     */
    Context.prototype.removeComponentFromContext = function (componentId) {
        return this.components.delete(componentId);
    };
    /**
     * Function that removes all components from application context,
     * calls destroy-methods before their deletion and finally closes it
     */
    Context.prototype.close = function () {
        var _this = this;
        Context.logger.info('Closing current context...');
        this.components.forEach(function (component) {
            var lifecycle = component.getLifecycle();
            lifecycle.callDestroyMethod();
            _this.removeComponentFromContext(component.getId());
        });
        Context.logger.info('Context is closed...');
        this.components.clear();
    };
    /**
     * Function that retrieves component's instance by unique identifier
     * @param {string} componentId unique identifier of the component
     * @returns component's entity instance
     */
    Context.prototype.getComponentEntityInstance = function (componentId) {
        var component = this.components.get(componentId);
        if (!component) {
            throw new core_module_1.ComponentNotFoundError("Component was not found by id \"" + componentId + "\"");
        }
        if (component.getScope() === 1 /* PROTOTYPE */) {
            return _.cloneDeep(component.getEntityInstance());
        }
        return component.getEntityInstance();
    };
    /**
     * Function that closes application context in safe-mode
     * as the main program's process is finished.
     */
    Context.prototype.registerShutdownHook = function () {
        var _this = this;
        process.on('exit', function () {
            _this.close();
        });
        process.on('SIGINT', function () {
            _this.close();
        });
    };
    /**
     * Logger for logging all important events in the application context
     */
    Context.logger = require('log4js').getLogger();
    return Context;
}());
exports.default = Context;
