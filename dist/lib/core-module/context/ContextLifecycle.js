"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_module_1 = require("../core-module");
/**
 * Class of the application context's lifecycle
 */
var ContextLifecycle = (function () {
    /**
     * Default constructor of the context's lifecycle
     */
    function ContextLifecycle() {
        this.componentLifecycles = new Map();
    }
    /**
     * Function that returns all lifecycles of all components from the application context
     * @returns {Map<string, ComponentLifecycle>} lifecycles of all components
     */
    ContextLifecycle.prototype.getComponentLifecycles = function () {
        return this.componentLifecycles;
    };
    /**
     * Function that returns lifecycles by its component's unique identifier
     * @param componentId component's unique identifier
     * @returns {ComponentLifecycle} lifecycle of the component
     */
    ContextLifecycle.prototype.getLifecycleByComponentId = function (componentId) {
        var lifecycle = this.componentLifecycles.get(componentId);
        if (!lifecycle) {
            throw new core_module_1.LifecycleNotFoundError(componentId);
        }
        return lifecycle;
    };
    return ContextLifecycle;
}());
exports.default = ContextLifecycle;
