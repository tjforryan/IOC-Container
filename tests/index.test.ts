import { expect } from 'chai';

import IOCContainer from '../src/index';
import Salad from '../examples/classes/Salad';
import Sauce from '../examples/classes/Sauce';
import Sandwich from '../examples/classes/Sandwich';
import Pizza from '../examples/classes/Pizza';
import FancyRestaurant from '../examples/classes/FancyRestaurant';
import { Dish, Restaurant } from '../examples/examples';

describe('IOCContainer', () => {
  describe('basic behaviour', () => {
    it('will resolve the requested non-class dependency with what was injected', () => {
      const container = new IOCContainer();
      const TEST_KEY = 'TEST_KEY';

      container.registerVar(TEST_KEY, 'Bon Apetit');

      const instance = container.resolve(TEST_KEY);
      expect(instance).to.equal('Bon Apetit');
    });

    it('will successfully resolve with a new instance of a registered class', () => {
      const container = new IOCContainer();
      const TEST_KEY = 'TEST_KEY';

      container.registerClass(TEST_KEY, Salad);

      const instance = container.resolve(TEST_KEY);
      expect(instance).to.be.an.instanceof(Salad);
    });

    it('will error if the requested key is not registered', () => {
      const container = new IOCContainer();
      const TEST_KEY = 'TEST_KEY';

      expect(() => container.resolve(TEST_KEY)).to.throw(
        `Attempted to resolve unregistered module with key: ${TEST_KEY}`
      );
    });
  });

  describe('with class dependencies', () => {
    it('will resolve the requested module with dependency injected', () => {
      const container = new IOCContainer();
      const TEST_KEY = 'TEST_KEY';
      const DEPENDENCY_KEY = 'DEPENDENCY_KEY';

      container.registerClass(TEST_KEY, Sandwich);
      container.registerClass(DEPENDENCY_KEY, Salad);

      container.bindDependency(TEST_KEY, DEPENDENCY_KEY, 0);

      const instance = container.resolve(TEST_KEY) as Dish;

      expect(instance).to.be.an.instanceof(Sandwich);
      expect(instance.serve()).to.equal(
        'two slices of bread with heaps of healthy salad'
      );
    });

    it('if re-registered, will resolve the requested module with last dependency registered', () => {
      const container = new IOCContainer();
      const TEST_KEY = 'TEST_KEY';
      const DEPENDENCY_KEY = 'DEPENDENCY_KEY';

      container.registerClass(TEST_KEY, Sandwich);
      container.registerClass(DEPENDENCY_KEY, Salad);
      container.registerClass(DEPENDENCY_KEY, Sauce);

      container.bindDependency(TEST_KEY, DEPENDENCY_KEY, 0);

      const instance = container.resolve(TEST_KEY) as Dish;

      expect(instance).to.be.an.instanceof(Sandwich);
      expect(instance.serve()).to.equal(
        'two slices of bread with a smattering of tasty sauce'
      );
    });

    it('will resolve the requested module with multiple levels of dependencies', () => {
      const container = new IOCContainer();
      const TEST_KEY = 'TEST_KEY';
      const DEPENDENCY_KEY = 'DEPENDENCY_KEY';
      const DEP_DEPENDENCY_KEY = 'DEP_DEPENDENCY_KEY';

      container.registerClass(TEST_KEY, FancyRestaurant);
      container.registerClass(DEPENDENCY_KEY, Sandwich);
      container.registerClass(DEP_DEPENDENCY_KEY, Sauce);

      container.bindDependency(TEST_KEY, DEPENDENCY_KEY, 1);
      container.bindDependency(DEPENDENCY_KEY, DEP_DEPENDENCY_KEY, 0);

      const instance = container.resolve(TEST_KEY) as Restaurant;

      expect(instance).to.be.an.instanceof(FancyRestaurant);
      expect(instance.serveOrder()).to.include(
        'served two slices of bread with a smattering of tasty sauce - but in style!'
      );
    });

    it('will still resolve with bound dependencies, even after a new dependency is registered', () => {
      const container = new IOCContainer();
      const TEST_KEY = 'TEST_KEY';
      const DEPENDENCY_KEY = 'DEPENDENCY_KEY';
      const DEP_DEPENDENCY_KEY = 'DEP_DEPENDENCY_KEY';

      container.registerClass(TEST_KEY, FancyRestaurant);
      container.registerClass(DEPENDENCY_KEY, Sandwich);
      container.registerClass(DEP_DEPENDENCY_KEY, Sauce);

      container.bindDependency(TEST_KEY, DEPENDENCY_KEY, 1);
      container.bindDependency(DEPENDENCY_KEY, DEP_DEPENDENCY_KEY, 0);

      container.registerClass(DEPENDENCY_KEY, Pizza);

      const instance = container.resolve(TEST_KEY) as Restaurant;

      expect(instance).to.be.an.instanceof(FancyRestaurant);
      expect(instance.serveOrder()).to.include(
        'served cheesy, doughy goodness covered in a smattering of tasty sauce - but in style!'
      );
    });

    it('will fail to bind unregistered dependency', () => {
      const container = new IOCContainer();
      const TEST_KEY = 'TEST_KEY';
      const DEPENDENCY_KEY = 'DEPENDENCY_KEY';

      container.registerClass(TEST_KEY, Sandwich);

      expect(() =>
        container.bindDependency(TEST_KEY, DEPENDENCY_KEY, 0)
      ).to.throw(
        `Attempted to bind unregistered child module, with key: ${DEPENDENCY_KEY}`
      );
    });

    it('will fail to bind unregistered parent', () => {
      const container = new IOCContainer();
      const TEST_KEY = 'TEST_KEY';
      const DEPENDENCY_KEY = 'DEPENDENCY_KEY';

      container.registerClass(DEPENDENCY_KEY, Salad);

      expect(() =>
        container.bindDependency(TEST_KEY, DEPENDENCY_KEY, 0)
      ).to.throw(
        `Attempted to bind unregistered parent module, with key: ${TEST_KEY}`
      );
    });

    it('will error on simple circular dependencies', () => {
      const container = new IOCContainer();
      const TEST_KEY_1 = 'TEST_KEY_1';
      const TEST_KEY_2 = 'TEST_KEY_2';

      container.registerClass(TEST_KEY_1, Salad);
      container.registerClass(TEST_KEY_2, Sandwich);

      container.bindDependency(TEST_KEY_1, TEST_KEY_2, 0);
      container.bindDependency(TEST_KEY_2, TEST_KEY_1, 0);

      expect(() => container.resolve(TEST_KEY_1)).to.throw(
        `Circular dependency detected: ${TEST_KEY_1} -> ${TEST_KEY_2} -> ${TEST_KEY_1}`
      );
    });

    it('will error on more complex circular dependencies', () => {
      const container = new IOCContainer();
      const TEST_KEY_1 = 'TEST_KEY_1';
      const TEST_KEY_2 = 'TEST_KEY_2';
      const TEST_KEY_3 = 'TEST_KEY_3';
      const TEST_KEY_4 = 'TEST_KEY_4';

      container.registerClass(TEST_KEY_1, Salad);
      container.registerClass(TEST_KEY_2, Sandwich);
      container.registerClass(TEST_KEY_3, Sauce);
      container.registerClass(TEST_KEY_4, Pizza);

      container.bindDependency(TEST_KEY_1, TEST_KEY_2, 0);
      container.bindDependency(TEST_KEY_2, TEST_KEY_3, 0);
      container.bindDependency(TEST_KEY_2, TEST_KEY_4, 0);
      container.bindDependency(TEST_KEY_4, TEST_KEY_1, 0);

      expect(() => container.resolve(TEST_KEY_1)).to.throw(
        `Circular dependency detected: ${TEST_KEY_1} -> ${TEST_KEY_2} -> ${TEST_KEY_4} -> ${TEST_KEY_1}`
      );
    });
  });

  describe('with non-class dependencies', () => {
    let container;

    const KEYS = {
      RESTAURANT: 'RESTAURANT',
      DISH: 'DISH',
      INGREDIENT: 'INGREDIENT',
      CHEF_NAME: 'CHEF_NAME'
    };

    beforeEach(() => {
      container = new IOCContainer();

      container.registerClass(KEYS.RESTAURANT, FancyRestaurant);
      container.registerClass(KEYS.DISH, Sandwich);
      container.registerClass(KEYS.INGREDIENT, Sauce);

      container.registerVar(KEYS.CHEF_NAME, 'Pierre');

      container.bindDependency(KEYS.RESTAURANT, KEYS.CHEF_NAME, 0);
      container.bindDependency(KEYS.RESTAURANT, KEYS.DISH, 1);
      container.bindDependency(KEYS.DISH, KEYS.INGREDIENT, 0);
    });

    it('will resolve the requested non-class dependency with what was injected', () => {
      expect(
        (container.resolve(KEYS.RESTAURANT) as Restaurant).serveOrder()
      ).to.include('Pierre');
    });

    it('if re-registered, will resolve the requested module with last non-class dependency registered', () => {
      container.registerVar(KEYS.CHEF_NAME, 'Greg');
      expect(
        (container.resolve(KEYS.RESTAURANT) as Restaurant).serveOrder()
      ).to.include('Greg');
    });

    it('will fail to bind dependencies for non-class parent', () => {
      expect(() =>
        container.bindDependency(KEYS.CHEF_NAME, KEYS.DISH, 0)
      ).to.throw(
        `Attempted to bind non-class parent module, with key: ${KEYS.CHEF_NAME}`
      );
    });
  });
});
