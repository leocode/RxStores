import { Provider } from '..';
import { TestStore } from './helpers/TestStore';


let provider = Provider;

describe('Context provider', () => {
  beforeAll(() => {

  });

  it('should get an instance of test Store from global context', () => {
    const testStore = provider.getStore(TestStore);

    expect(testStore).toBeInstanceOf(TestStore);
  });

  it('should differentiate global and custom contexts', () => {
    const globalStore = provider.getStore(TestStore);
    const customStore = provider.from('test.custom').getStore(TestStore);

    expect(globalStore).not.toBe(customStore);
  });

  it('should differentiate custom contexts', () => {
    const customStoreA = provider.from('test.custom.A').getStore(TestStore);
    const customStoreB = provider.from('test.custom.B').getStore(TestStore);

    expect(customStoreA).not.toBe(customStoreB);
  });
});
