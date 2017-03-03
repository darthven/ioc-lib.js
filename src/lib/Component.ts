import Property from './Property'
import Lifecycle from './Lifecycle'

class Component {

  private id: string;
  private name: string;
  private classPath: string;
  private properties: Property[];
  private lifecycle: Lifecycle;

  constructor() {
    this.defineLifecycle();
  }

  public getId() : string {
    return this.id;
  }

  public setId(id: string) : void {
    this.id = id;
  }

  public getName() : string {
    return this.name;
  }

  public setName(name: string) : void {
    this.name = name;
  }

  public getProperties() : Property[] {
    return this.properties;
  }

  public setProperties(properties: Property[]) : void {
    this.properties = properties;
  }

  public getClassPath() : string {
    return this.classPath;
  }

  public setClassPath(classPath: string) : void {
    this.classPath = classPath;
  }

  private defineLifecycle(): void {
    this.lifecycle = new Lifecycle();
  }

  public getLifecycle(): Lifecycle {
    return this.lifecycle;
  }
}

export default Component;
