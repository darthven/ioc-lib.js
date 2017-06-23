import {Scope, default as Component} from './Component'
import Property from './Property'
import ComponentLifeCycle from './ComponentLifecycle'
import ComponentNotFoundError from './ComponentNotFoundError'
import jsonfile = require('jsonfile');
class Context {
  private components: Map<string, Component>;
  private configs: string[];

  constructor(configs: string[]) {
    this.configs = configs;
    this.putComponentsFromConfigurationIntoContext();
    console.log('Context was initialized');
  }

  private getObjectsFromJSON() {
    let objects = [];
    this.configs.forEach((config) => {
      let configFile = jsonfile.readFileSync(config).configuration;
      objects.push({configName: config, config: configFile});
    });
    return objects;
  }

  public updateContext(): void {
    this.putComponentsFromConfigurationIntoContext();
  }

  private getConfigComponents() {
      return this.getSortedComponentsByComplexity(this.getUniqueConfigComponents());
  }

  private putComponentsFromConfigurationIntoContext(): void {
    let basicComponents = new Map<string, Component>();
    let configComponents = this.getConfigComponents();
    this.setBasicPropertiesToComponents(configComponents, basicComponents);
    this.setReferencesToComponents(configComponents, basicComponents);
    this.components = basicComponents;
    console.log(this.components);
  }

  private setBasicPropertiesToComponents(configComponents, basicComponents) {
      configComponents.forEach((comp) => {
          const lifecycle = new ComponentLifeCycle();
          lifecycle.setComponentId(comp.id);
          const entity = require(comp.classPath).default.prototype;
          if(entity[comp.lifecycle.initMethod]) {
              lifecycle.setInitMethod(entity[comp.lifecycle.initMethod]);
              lifecycle.callInitMethod(entity);
          }
          if(entity[comp.lifecycle.destroyMethod]) {
              lifecycle.setDestroyMethod(entity[comp.lifecycle.destroyMethod]);
          }
          let component = new Component(comp.id,
              comp.name, comp.classPath, this.defineComponentScope(comp), lifecycle);
          let properties = this.getPropertyValuesFromConfiguration(comp);
          component.setProperties(properties);
          if(entity[comp.lifecycle.afterPropertiesWereSetMethod]) {
              lifecycle.setAfterPropertiesWereSetMethod(entity[comp.lifecycle.afterPropertiesWereSetMethod]);
              lifecycle.callAfterPropertiesWereSetMethod(entity);
          }
          basicComponents.set(comp.id, Object.assign(component, entity));
      });
  }


  private setReferencesToComponents(configComponents, basicComponents): void {
      basicComponents.forEach((component) => {
          configComponents.forEach((comp) => {
              const references = this.getPropertyReferencesFromConfiguration(comp, configComponents);
              console.log('REFERENCES ' + references);
              const currentProperties = component.getProperties();
              component.setProperties(currentProperties.concat(references));
          });
      });
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
    return Scope.SINGLETON;
  }


  private getPropertyValuesFromConfiguration(component): Property[] {
    let propertiesFromContext = component.properties;
    let properties = [];
    if(propertiesFromContext) {
      propertiesFromContext.forEach((prop) => {
        let property = new Property(prop.name);
        if(prop['value']) {
          property.setValue(prop.value);
          properties.push(property);
        }
      });
    }
    return properties;
  }

  private getPropertyReferencesFromConfiguration(component, components): Property[] {
      let propertiesFromContext = component.properties;
      let properties = [];
      if(propertiesFromContext) {
          propertiesFromContext.forEach((prop) => {
              let property = new Property(prop.name);
              if(prop['reference']) {
                  console.log('REFERENCE ' + prop.reference);
                  property.setReference(prop.reference);
                  properties.push(property);
              }
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
    if(!component) {
      throw new ComponentNotFoundError(`Component was not found by id "${componentId}"`);
    }
    if(component.getScope() === Scope.PROTOTYPE) {
      return Object.assign({}, component);
    }
    return component;
  }

  private removeComponentFromContext(componentId: string): boolean {
    return this.components.delete(componentId);
  }

  private close(): void {
    console.log('Closing current context...');
    this.components.forEach((component) => {
      const lifecycle = component.getLifecycle();
      lifecycle.callDestroyMethod(component);
    });
    console.log('Context is closed...');
    this.components.clear();
    this.configs = null;
  }

  public registerShutdownHook(): void {
    process.on('exit', () => {
      this.close();
    });
    process.on('SIGINT', () => {
      this.close();
    });
    process.on('uncaughtException', (exception) => {
      this.close();
      console.error(exception.stack);
      process.exit(99);
    });
  }
}
export default Context;
