class ComponentLifecycle {

  private initMethod: Function;
  private afterPropertiesWereSetMethod: Function
  private destroyMethod: Function;

  public callInitMethod(): void  {
    this.initMethod();
  }

  public setInitMethod(initMethod: Function): void  {
    this.initMethod = initMethod;
  }

  public callAfterPropertiesWereSetMethod(): void  {
    this.afterPropertiesWereSetMethod();
  }

  public setAfterPropertiesWereSetMethod(afterPropertiesWereSetMethod: Function): void  {
    this.afterPropertiesWereSetMethod = afterPropertiesWereSetMethod
  }

  public getDestroyMethod(): Function  {
    if(this.destroyMethod) {
      return this.destroyMethod;
    }
    return null;
  }

  public setDestroyMethod(destroyMethod: Function): void  {
    this.destroyMethod = destroyMethod;
  }
}

export default ComponentLifecycle;
