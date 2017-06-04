class ComponentLifecycle {

  private componentId: string;
  private initMethod: Function;
  private afterPropertiesWereSetMethod: Function;
  private destroyMethod: Function;


  public getComponentId(): string {
    return this.componentId;
  }

  public setComponentId(value: string): void{
    this.componentId = value;
  }

  public callInitMethod(): void  {
    this.initMethod();
    console.log(`Component with id "${this.getComponentId()}" was initialized`);
  }

  public setInitMethod(initMethod: Function): void  {
    this.initMethod = initMethod;
  }

  public callAfterPropertiesWereSetMethod(): void  {
    this.afterPropertiesWereSetMethod();
    console.log(`Component with id "${this.getComponentId()}" received its properties`);
  }

  public setAfterPropertiesWereSetMethod(afterPropertiesWereSetMethod: Function): void  {
    this.afterPropertiesWereSetMethod = afterPropertiesWereSetMethod
  }

  public callDestroyMethod(): void  {
    this.destroyMethod();
    console.log(`Component with id "${this.getComponentId()}" was destroyed`);
  }

  public setDestroyMethod(destroyMethod: Function): void  {
    this.destroyMethod = destroyMethod;
  }
}

export default ComponentLifecycle;
