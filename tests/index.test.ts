import { expect } from 'chai';

import IOCContainer from '../src/index';
import Salad from '../examples/classes/Salad';

describe('IOCContainer', () => {
  it('will resolve with a new instance of a registered class', () => {
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
      `Attempted to resolve non-existent module with key: ${TEST_KEY}`
    );
  });
});
