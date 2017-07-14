import {Component, ComponentLifecycle} from '../core-module';
import ReflectionUtil from "../utils/ReflectionUtil";
import {Scope} from "./Component";

export function component(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('TARGET PROTOTYPE', target);
    console.log('TARGET CONSTRUCTOR', target.constructor);
    console.log('PROPERTY KEY:', propertyKey);
    //const fields = ReflectionUtil.getFunctionArgumentsNames(target);
    const entity = descriptor.value;
    console.log('DESCRIPTOR VALUE', entity);
    const componentInstance = () => {
      let lifecycle = new ComponentLifecycle();
      let component = new Component();
      component.setLifecycle(lifecycle);
      return Object.assign(component, Object.getPrototypeOf(entity.call()));
    };
    descriptor.value = componentInstance;
    return descriptor;
}

export function initMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('TARGET:', target);
    console.log('Property KEY:', propertyKey);
    console.log('DESCRIPTOR:', descriptor);
    target['isInitMethod'] = true;
    //target['lifecycle']['initMethod'] = target[propertyKey];
    console.log(descriptor);
}

export function afterPropertiesWereSetMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('TARGET:', target);
    console.log('Property KEY:', propertyKey);
    console.log('DESCRIPTOR:', descriptor);
    descriptor['isAfterPropertiesWereSetMethod'] = true;
    //target['lifecycle']['afterPropertiesWereSetMethod'] = target[propertyKey];
    console.log(descriptor);
}

export function destroyMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('TARGET:', target);
    console.log('Property KEY:', propertyKey);
    console.log('DESCRIPTOR:', descriptor);
    descriptor['isDestroyMethod'] = true;
    //target['lifecycle']['destroyMethod'] = target[propertyKey];
    console.log(descriptor);
}

export function value(target, name, descriptor) {
    console.log('TARGET:', target);
    console.log('NAME:', name);
    console.log('DESCRIPTOR:', descriptor);
}

export function injected(target, name, descriptor) {
    console.log('TARGET:', target);
    console.log('NAME:', name);
    console.log('DESCRIPTOR:', descriptor);
}

export function configuration() {

}

