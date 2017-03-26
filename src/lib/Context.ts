import Component from './Component'

class Context {
  private components: Component[];
  private configs: string[];

  constructor(configs: string[]) {
    this.configs = configs;
    //this.parseContextFileContent();
  }

  public getObjectsFromJSON() {
    let objects = [];
    this.configs.forEach((config) => {      
      let json = require(config).configuration;
      objects.push({configName: config, config: json});
    });
    return objects;
  }

  private parseContextFileContent(): void {
    let components = [];
    let objects = this.getObjectsFromJSON();
    /*TODO Here should be the logic of retrieving components from content.
    Retrieving components from context will call their initMethod from their Lifecycle instance,
    the similar logic will be working after setting properties for the components and after closing current context.
    */
    this.components = components;
  }

  public getComponent(componentId: string) {
    //TODO Here should be the logic of retrieving components from context as js-objects.
  }
}

export default Context;
