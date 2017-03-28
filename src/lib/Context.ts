import {Scope, default as Component} from './Component'
import Property from './Property'
import Lifecycle from './Lifecycle'

class Context {
  private components: Map<string, Component>;
  private lifecycle: Lifecycle;
  private configs: string[];

  constructor(configs: string[]) {
    this.configs = configs;
    this.putComponentsFromConfigurationIntoContext();
  }

  private getObjectsFromJSON() {
    let objects = [];
    this.configs.forEach((config) => {
      let json = require(config).configuration;
      objects.push({configName: config, config: json});
    });
    return objects;
  }

  private putComponentsFromConfigurationIntoContext(): void {
    let components = new Map<string, Component>();
    let configComponents = this.getSortedComponentsByComplexity(this.getUniqueConfigComponents());
    configComponents.forEach((comp) => {
      const lifecycle = comp.lifecycle;
      const entity = require(comp.classPath).default.prototype;
      if(entity[lifecycle.initMethod]) {
        entity[lifecycle.initMethod].call();
      }
      let component = new Component(comp.id,
        comp.name, comp.classPath, this.defineComponentScope(comp));
      let properties = this.getPropertiesFromConfiguration(comp, components);
      component.setProperties(properties);
      //TODO Here should be logic from lifecycle about init-methods
      components.set(comp.id, Object.assign(component, entity));
    });
    this.components = components;
    console.log(this.components.entries());
  }


  private getUniqueConfigComponents() {
    let configComponents = [];
    const objects = this.getObjectsFromJSON();
    objects.forEach(object => {
      object.config.components.forEach(component => {
        if(!configComponents.find(elem => elem.id === component.id)) {
          configComponents.push(component);
        }
      });
    });
    return configComponents;
  }

  private defineComponentScope(componentFromContext): any {
    if(componentFromContext.scope === 'singleton') {
      return Scope.SINGLETON;
    } else if(componentFromContext.scope === 'prototype') {
      return Scope.PROTOTYPE;
    }
    return null;
  }


  private getPropertiesFromConfiguration(component, components): Property[] {
    let propertiesFromContext = component.properties;
    let properties = [];
    if(propertiesFromContext) {
      propertiesFromContext.forEach((prop) => {
        let property = new Property(prop.name);
        if(prop['value']) {
          property.setValue(prop.value);
        } else if(prop['reference']) {
          property.setReference(components.get(prop.reference));
        }
        properties.push(property);
      });
    }
    return properties;
  }

  private isSimpleComponent(componentFromContext): boolean {
    return componentFromContext.properties.some(prop => prop['reference']);
  }

  private getSortedComponentsByComplexity(componentsFromContext) {
    return componentsFromContext.sort((comp1, comp2) => this.isSimpleComponent(comp1) > this.isSimpleComponent(comp2));
  }

  public getComponent(componentId: string): any {
    let component = this.components.get(componentId);
    if(component.getScope() === Scope.PROTOTYPE) {
      return Object.assign({}, component);
    }
    return component;
  }

  private removeComponentFromContext(componentId: string): boolean {
    return this.components.delete(componentId);
  }

  public close(): void {
    console.log('Closing current context...');
    //TODO Here should be logic from lifecycle about destroy-methods
    this.components.clear();
    this.lifecycle = null;
    this.configs = null;
  }

  public registerShutdownHook(): void {
    process.on('exit', () => this.close());
  }
}
export default Context;
