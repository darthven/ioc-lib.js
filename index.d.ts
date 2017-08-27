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

    getComponentEntityInstanceById(componentId: string): any;

    registerShutdownHook(): void;
}



export declare class MetadataContext extends Context {

    configs: string[];

    constructor(configs?: string[]);
}

export declare class DecoratorContext extends Context {

    configs: any[];

    constructor(configs?: any[]);

    getComponentEntityInstanceByClass(Class: any): any;
}

export declare function component(componentDescriptor?: Object): Function;

export declare function preInit(target: Object, key: string): PropertyDescriptor;

export declare function postInit(target: Object, key: string): PropertyDescriptor;

export declare function preDestroy(target: Object, key: string): PropertyDescriptor;

export declare function postDestroy(target: Object, key: string): PropertyDescriptor;