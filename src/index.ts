export default class IOCContainer {
  private registeredDeps: {
    [moduleKey: string]: {
      type: 'class' | 'var';
      dependency: any;
      subDependencies?: string[];
    };
  };

  public constructor() {
    this.registeredDeps = {};
  }

  public registerClass(moduleKey: string, dependency): void {
    if (!this.registeredDeps[moduleKey]) {
      this.registeredDeps[moduleKey] = {
        type: 'class',
        dependency,
        subDependencies: []
      };
    } else {
      this.registeredDeps[moduleKey].dependency = dependency;
    }
  }

  public registerVar(moduleKey: string, dependency): void {
    if (!this.registeredDeps[moduleKey]) {
      this.registeredDeps[moduleKey] = {
        type: 'var',
        dependency
      };
    } else {
      this.registeredDeps[moduleKey].dependency = dependency;
    }
  }

  public bindDependency(
    parentModuleKey: string,
    childModuleKey: string,
    index: number
  ): void {
    if (!this.registeredDeps[parentModuleKey]) {
      throw new Error(
        `Attempted to bind unregistered parent module, with key: ${parentModuleKey}`
      );
    }

    if (!this.registeredDeps[childModuleKey]) {
      throw new Error(
        `Attempted to bind unregistered child module, with key: ${childModuleKey}`
      );
    }

    if (this.registeredDeps[parentModuleKey].type !== 'class') {
      throw new Error(
        `Attempted to bind non-class parent module, with key: ${parentModuleKey}`
      );
    }

    this.registeredDeps[parentModuleKey].subDependencies[
      index
    ] = childModuleKey;
  }

  public resolve(moduleKey: string, dependencyChain: string[] = []): object {
    const moduleToResolve = this.registeredDeps[moduleKey];

    if (dependencyChain.includes(moduleKey)) {
      throw new Error(
        `Circular dependency detected: ${dependencyChain.join(
          ' -> '
        )} -> ${moduleKey}`
      );
    }

    const newDependencyChain = [...dependencyChain, moduleKey];

    if (!moduleToResolve) {
      throw new Error(
        `Attempted to resolve unregistered module with key: ${moduleKey}`
      );
    }

    const { dependency, subDependencies, type } = moduleToResolve;

    if (type === 'var') {
      return dependency;
    }

    const args = subDependencies.map(key =>
      this.resolve(key, newDependencyChain)
    );

    return new dependency(...args);
  }
}
