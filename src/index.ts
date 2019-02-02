export default class IOCContainer {
  private registeredTypes;

  public constructor() {
    this.registeredTypes = {};
  }

  public register(moduleKey: string, moduleClass): void {
    this.registeredTypes[moduleKey] = {
      moduleClass,
      dependencies: []
    };
  }

  public bindDependency(
    parentModuleKey: string,
    childModuleKey: string,
    index: number
  ): void {
    if (!this.registeredTypes[parentModuleKey]) {
      throw new Error(
        `Attempted to bind unregistered parent module, with key: ${parentModuleKey}`
      );
    }

    if (!this.registeredTypes[childModuleKey]) {
      throw new Error(
        `Attempted to bind unregistered child module, with key: ${childModuleKey}`
      );
    }

    this.registeredTypes[parentModuleKey].dependencies[index] = childModuleKey;
  }

  public resolve(moduleKey: string): object {
    const moduleToResolve = this.registeredTypes[moduleKey];

    if (!moduleToResolve) {
      throw new Error(
        `Attempted to resolve unregistered module with key: ${moduleKey}`
      );
    }

    const { moduleClass, dependencies } = moduleToResolve;
    const args = dependencies.map(key => this.resolve(key));

    return new moduleClass(...args);
  }
}
