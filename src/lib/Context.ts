import Component from './Component'
import Property from './Property'

class Context {
  private components: Map<string, Component>;
  private configs: string[];

  constructor(configs: string[]) {
    this.configs = configs;
    this.getComponentsFromConfiguration();
    //console.log(this.components.entries());
  }

  private getObjectsFromJSON() {
    let objects = [];
    this.configs.forEach((config) => {
      let json = require(config).configuration;
      objects.push({configName: config, config: json});
    });
    return objects;
  }

  private getComponentsFromConfiguration(): void {
    let components = new Map<string, Component>();
    const objects = this.getObjectsFromJSON();
    objects.forEach((object) => {
      let sortedConfigComponents = this.getSortedComponentsByComplexity(object.config.components);
      console.log(sortedConfigComponents);
      sortedConfigComponents.forEach((comp) => {
        //console.log(this.isSimpleComponent(comp));
        let path = comp.classPath;
        let component = new Component(comp.id,
          comp.name, comp.classPath);
        let properties = this.getPropertiesFromConfiguration(comp, components);
        //console.log(properties);
        component.setProperties(properties);
        components.set(comp.id, Object.assign(component, require(path).default.prototype));
      });
    });
    this.components = components;
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

  private isSimpleComponent(component): boolean {
    return component.properties.some(prop => prop['reference']);
  }

  private getSortedComponentsByComplexity(componentsFromContext) {
    return componentsFromContext.sort((comp1, comp2) => this.isSimpleComponent(comp1) > this.isSimpleComponent(comp2));
  }

  private setProperties(): void {

  }

  public getComponent(componentId: string): any {
    return this.components.get(componentId);
  }
}

export default Context;
