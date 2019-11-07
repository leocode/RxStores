import { Provider } from '..';
import { TestStore } from './helpers/TestStore';

describe('Context provider', () => {
  it('should get an instance of test Store from global context', async done => {
    const testStore = Provider.getStore(TestStore);

    expect(testStore).toBeInstanceOf(TestStore);
    done();
  });

  it('should differentiate global and custom contexts', async done => {
    const globalStore = Provider.getStore(TestStore);
    const customStore = Provider.from('test.custom').getStore(TestStore);

    expect(globalStore).not.toBe(customStore);
    done();
  });

  it('should differentiate custom contexts', async done => {
    const customStoreA = Provider.from('test.custom.A').getStore(TestStore);
    const customStoreB = Provider.from('test.custom.B').getStore(TestStore);

    expect(customStoreA).not.toBe(customStoreB);
    done();
  });
});
