import { expect } from 'chai';

import IOCContainer from '../src/index';
import Salad from '../examples/classes/Salad';
import Sauce from '../examples/classes/Sauce';
import Sandwich from '../examples/classes/Sandwich';
import FancyRestaurant from '../examples/classes/FancyRestaurant';
import { Dish, Restaurant } from '../examples/examples';

describe('IOCContainer', () => {
  describe('basic behaviour', () => {
    it('will successfully resolve with a new instance of a registered class', () => {
      const container = new IOCContainer();
      const TEST_KEY = 'TEST_KEY';

      container.register(TEST_KEY, Salad);

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

  describe('when dependency is bound', () => {
    it('will resolve the requested module with dependency injected', () => {
      const container = new IOCContainer();
      const TEST_KEY = 'TEST_KEY';
      const DEPENDENCY_KEY = 'DEPENDENCY_KEY';

      container.register(TEST_KEY, Sandwich);
      container.register(DEPENDENCY_KEY, Salad);

      container.bindDependency(TEST_KEY, DEPENDENCY_KEY, 0);

      const instance = container.resolve(TEST_KEY) as Dish;

      expect(instance).to.be.an.instanceof(Sandwich);
      expect(instance.serve()).to.equal(
        'two slices of bread with heaps of healthy salad'
      );
    });

    it('will resolve the requested module with last dependency registered', () => {
      const container = new IOCContainer();
      const TEST_KEY = 'TEST_KEY';
      const DEPENDENCY_KEY = 'DEPENDENCY_KEY';

      container.register(TEST_KEY, Sandwich);
      container.register(DEPENDENCY_KEY, Salad);
      container.register(DEPENDENCY_KEY, Sauce);

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

      container.register(TEST_KEY, FancyRestaurant);
      container.register(DEPENDENCY_KEY, Sandwich);
      container.register(DEP_DEPENDENCY_KEY, Sauce);

      container.bindDependency(TEST_KEY, DEPENDENCY_KEY, 0);
      container.bindDependency(DEPENDENCY_KEY, DEP_DEPENDENCY_KEY, 0);

      const instance = container.resolve(TEST_KEY) as Restaurant;

      expect(instance).to.be.an.instanceof(FancyRestaurant);
      expect(instance.serveOrder()).to.equal(
        'Served two slices of bread with a smattering of tasty sauce - but in style!'
      );
    });

    it('will fail to bind unregistered dependency', () => {
      const container = new IOCContainer();
      const TEST_KEY = 'TEST_KEY';
      const DEPENDENCY_KEY = 'DEPENDENCY_KEY';

      container.register(TEST_KEY, Sandwich);

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

      container.register(DEPENDENCY_KEY, Salad);

      expect(() =>
        container.bindDependency(TEST_KEY, DEPENDENCY_KEY, 0)
      ).to.throw(
        `Attempted to bind unregistered parent module, with key: ${TEST_KEY}`
      );
    });
  });
});
