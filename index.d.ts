declare const enum Scope {}

interface Component {

    id: string;

    componentName: string;

    classPath: string;

    scope: Scope;

    entityInstance: any;
}

interface ComponentLifecycle {

    componentId: string;

    preInitMethod: Function;

    postInitMethod: Function;

    beforePropertiesWillBeSetMethod: Function;

    afterPropertiesWereSetMethod: Function;

    preDestroyMethod: Function;

    postDestroyMethod: Function;

}

interface ContextLifecycle {

    componentLifecycles: Map<string, ComponentLifecycle>;
}

declare class Context {

    components: Map<string, Component>;

    contextLifecycle: ContextLifecycle;

    constructor();

    getContextLifecycle(): ContextLifecycle;

    getComponents(): Map<string, Component>;

    getComponentEntityInstance(componentId: string): any;

    registerShutdownHook(): void;
}



export declare class MetadataContext extends Context {

    constructor(configs?: string[]);

    configs: string[];

    updateContext();

}

export declare class DecoratorContext extends Context {

    //TODO fill it after creating real class

}
