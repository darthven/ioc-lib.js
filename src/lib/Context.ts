import Component from './Component'
import Property from './Property'

class Context {
  private components: Map<string, Component>;
  private configs: string[];

  constructor(configs: string[]) {
    this.configs = configs;
    this.getComponentsFromConfiguration();
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
      object.config.components.forEach((comp) => {
        let component = new Component(comp.id,
          comp.name, comp.classPath);
        components.set(comp.id, component);
      });
    });
    this.components = components;
  }

  public getComponent(componentId: string) {
    return this.components.get(componentId);
  }
}

export default Context;
