"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function component(target, propertyKey, descriptor) {
    console.log('TARGET PROTOTYPE', target);
    console.log('TARGET CONSTRUCTOR', target.constructor);
    console.log('PROPERTY KEY:', propertyKey);
    //const fields = ReflectionUtil.getFunctionArgumentsNames(target);
    var entity = descriptor.value;
    console.log('DESCRIPTOR VALUE', entity);
    // const componentInstance = () => {
    //   let lifecycle = new ComponentLifecycle();
    //   let component = new Component();
    //   component.setLifecycle(lifecycle);
    //   return Object.assign(component, Object.getPrototypeOf(entity.call()));
    // };
    // descriptor.value = componentInstance;
    return descriptor;
}
exports.component = component;
function initMethod(target, propertyKey, descriptor) {
    console.log('TARGET:', target);
    console.log('Property KEY:', propertyKey);
    console.log('DESCRIPTOR:', descriptor);
    target['isInitMethod'] = true;
    //target['lifecycle']['initMethod'] = target[propertyKey];
    console.log(descriptor);
}
exports.initMethod = initMethod;
function afterPropertiesWereSetMethod(target, propertyKey, descriptor) {
    console.log('TARGET:', target);
    console.log('Property KEY:', propertyKey);
    console.log('DESCRIPTOR:', descriptor);
    descriptor['isAfterPropertiesWereSetMethod'] = true;
    //target['lifecycle']['afterPropertiesWereSetMethod'] = target[propertyKey];
    console.log(descriptor);
}
exports.afterPropertiesWereSetMethod = afterPropertiesWereSetMethod;
function destroyMethod(target, propertyKey, descriptor) {
    console.log('TARGET:', target);
    console.log('Property KEY:', propertyKey);
    console.log('DESCRIPTOR:', descriptor);
    descriptor['isDestroyMethod'] = true;
    //target['lifecycle']['destroyMethod'] = target[propertyKey];
    console.log(descriptor);
}
exports.destroyMethod = destroyMethod;
function value(target, name, descriptor) {
    console.log('TARGET:', target);
    console.log('NAME:', name);
    console.log('DESCRIPTOR:', descriptor);
}
exports.value = value;
function injected(target, name, descriptor) {
    console.log('TARGET:', target);
    console.log('NAME:', name);
    console.log('DESCRIPTOR:', descriptor);
}
exports.injected = injected;
function configuration() {
}
exports.configuration = configuration;
