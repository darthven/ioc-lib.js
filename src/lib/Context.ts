import Component from './Component'

class Context {
  private components: Component[];
  private configs: string[];

  constructor(configs: string[]) {
    this.configs = configs;
    this.parseContextFileContent();
  }

  private getObjectsFromJSON() {
    let content = null;
    //TODO Here should be the logic of reading config files and getting js-objects from them
    return content;
  }

  private parseContextFileContent(): void {
    let components = [];
    let content = this.getObjectsFromJSON();
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
