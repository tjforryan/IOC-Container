export default class IOCContainer {
  private registeredTypes;

  public constructor() {
    this.registeredTypes = {};
  }

  public register(moduleKey: string, moduleClass): void {
    this.registeredTypes[moduleKey] = {
      moduleClass
    };
  }

  public resolve(moduleKey: string): object {
    if (!this.registeredTypes[moduleKey]) {
      throw new Error(
        `Attempted to resolve non-existent module with key: ${moduleKey}`
      );
    }

    const { moduleClass } = this.registeredTypes[moduleKey];
    return new moduleClass();
  }
}
