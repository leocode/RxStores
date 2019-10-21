import { Provider } from '..';
import { TestStore } from './helpers/TestStore';

describe('Context provider', () => {
  it('should get an instance of test Store from global context', () => {
    const testStore = Provider.getStore(TestStore);

    expect(testStore).toBeInstanceOf(TestStore);
  });

  it('should differentiate global and custom contexts', () => {
    const globalStore = Provider.getStore(TestStore);
    const customStore = Provider.from('test.custom').getStore(TestStore);

    expect(globalStore).not.toBe(customStore);
  });

  it('should differentiate custom contexts', () => {
    const customStoreA = Provider.from('test.custom.A').getStore(TestStore);
    const customStoreB = Provider.from('test.custom.B').getStore(TestStore);

    expect(customStoreA).not.toBe(customStoreB);
  });
});
