import ComponentLifecycle from "./ComponentLifecycle";
import LifecycleNotFoundError from "../errors/LifecycleNotFoundError";

/**
 * Class of the application context's lifecycle
 */
class ContextLifecycle {

    /**
     * Lifecycles of the components were registered in the context
     */
    private componentLifecycles: Map<string, ComponentLifecycle>;

    /**
     * Default constructor of the context's lifecycle
     */
    constructor() {
        this.componentLifecycles = new Map<string, ComponentLifecycle>();
    }

    /**
     * Function that returns all lifecycles of all components from the application context
     * @returns {Map<string, ComponentLifecycle>} lifecycles of all components
     */
    public getComponentLifecycles(): Map<string, ComponentLifecycle> {
        return this.componentLifecycles;
    }

    /**
     * Function that returns lifecycles by its component's unique identifier
     * @param componentId component's unique identifier
     * @returns {ComponentLifecycle} lifecycle of the component
     */
    public getLifecycleByComponentId(componentId: string): ComponentLifecycle {
        const lifecycle = this.componentLifecycles.get(componentId);
        if (!lifecycle) {
            throw new LifecycleNotFoundError(componentId);
        }
        return lifecycle;
    }
}

export default ContextLifecycle;