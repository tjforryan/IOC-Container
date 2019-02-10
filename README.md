# IoC Container
My IoC Container

> A simple IoC (Inversion of Control) Container, using Dependency Injection

## Installation
You can see the package [on npm](https://www.npmjs.com/package/@tjforryan/ioc-container)
```bash
npm i --save @tjforryan/ioc-container
yarn add @tjforryan/ioc-container
```

## Why?

As applications grow so does the number of dependencies that exist between modules.  Having all of these modules aware of their dependencies can hurt maintainability.

That's where inversion of control comes in.  IoC allows modules to work against abstracted interfaces instead of the concrete dependencies themselves.  Dependency Injection is one way of doing this, where a module is supplied its dependencies, allowing the module to only have knowledge of the interface it is working with.

However, as Dependency Injection pushes all the dependencies higher, this can make applications very top heavy  This can result in instantiating lots of dependencies at the highest level and then having to pass them into all of the other modules that need them.  This can result in some very messy and boilerplate heavy code, especially where modules are nested.

This IoC Container aims to solve that problem.  By performing instantiation itself it removes a lot of unnecessary boilerplate and, by abstracting away the dependency graph, it makes maintaining those dependencies easier.

## Usage

### Importing
Using `ES6 import`:
```javascript
import IocContainer from '@tjforryan/ioc-container';
```

Using `require`:
```javascript
const IocContainer = require('@tjforryan/ioc-container').default;
``` 

### API

#### Creating a new container
##### `const container = new IocContainer();`

When first created no dependencies will exist on the container.

#### Adding a dependency
There are two ways to add dependencies, depending on how you want them to be injected.

##### `container.registerClass(<key>, <dependency>)`
* This should only be used for dependencies that need to be instantiated.
* `<key>` is a string, which is used to refer to this dependency.
* `<dependency>` is the class that will be instantiated as this dependency, when resolved.

##### `container.registerVar(<key>, <dependency>)`
* This should be used for dependencies that don't need to be instantiated (eg: config variables, pre-existing instances etc).
* `<key>` is a string, which is used to refer to this dependency.
* `<dependency>` is the value that will be passed in as this dependency, when resolved.

#### Linking dependencies

##### `container.bindDependency(<parentKey>, <childKey>, <index>)`
* For this to work there should already be two dependencies registered with the keys passed to this function.  The parent needs to be a class (ie: registered using `container.registerClass`).
* `<parentKey>` is a string that refers to the parent, which will have the dependency injected.
* `<childKey>` is a string, that refers to the child, which will be the dependency that is injected.
* `<index>` is the argument index which the dependency will be injected into the parent.

##### `container.resolve(<key>)`
* If the key refers to a non-class dependency (one registered using `container.registerVar`), that value will be returned.
* If the key refers to a class dependency (one registered using `container.registerClass`), first any sub-dependencies will be resolved (perhaps recursing through multiple levels).  Then a new instance of the class registered for this dependency will be returned, with the resolved sub-dependencies being passed in to the constructor. 
* `<key>` is a string that refers to the dependency that will be retrieved from the container.

### Notes on usage
* Circular dependencies are not supported.  Instead, when attempting to resolve one, the container will error, with information to help identify where the circular dependency is.
* Once a dependency is registered, if another dependency is registered with the same key it will overwrite the original.  This can allow for hot-swapping of dependencies.
* It's recommended that keys exist, as constants, in some central location.  This will help to prevent mistakes or even collisions.
* If multiple modules need the same class dependency injected these will be separate instances.  If your class isn't a singleton and it is important that only one instance is used and  you can do this by instantiating it yourself and using `container.registerVar` instead of `container.registerClass`.
* The package has a generated type declaration file. for use with Typescript.

### Example
* The classes used below can be found under [`/examples`](https://github.com/tjforryan/IOC-Container/tree/master/examples).
* This IoC container is aimed at abstracting away dependency issues, when dependency management has become complex and hard to maintain.  This is only a toy example and, although it demonstrates its usage, is not representative of the best times to use this package.  This simpler example is used purely for readability.

```javascript
import IocContainer from '@tjforryan/ioc-container';

import Sauce from './classes/Sauce';
import Sandwich from './classes/Sandwich';
import FancyRestaurant from './classes/FancyRestaurant';

const KEYS = {
  RESTAURANT: 'RESTAURANT',
  DISH: 'DISH',
  INGREDIENT: 'INGREDIENT',
  CHEF_NAME: 'CHEF_NAME'
};

// A new container is created
const container = new IocContainer();

// Dependencies are registered with reference keys
container.registerClass(KEYS.RESTAURANT, FancyRestaurant);
container.registerClass(KEYS.DISH, Sandwich);
container.registerClass(KEYS.INGREDIENT, Sauce);

container.registerVar(KEYS.CHEF_NAME, 'Pierre');

// Dependencies are bound to sub-dependencies using their keys
container.bindDependency(KEYS.RESTAURANT, KEYS.CHEF_NAME, 0);
container.bindDependency(KEYS.RESTAURANT, KEYS.DISH, 1);
container.bindDependency(KEYS.DISH, KEYS.INGREDIENT, 0);

// Here the top level module is resolved, with its dependencies resolved for it.
// In this case the restaurant resolves as an instance of the FancyRestaurant class.
// It receives the string 'Pierre' and an instance of the Sandwich class.
// The Sandwich class in turn has had its own dependencies resolved, before instantiation.
const restaurant = container.resolve(KEYS.RESTAURANT);
```
