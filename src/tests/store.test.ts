import { take } from 'rxjs/operators';
import { Store } from '../store';
import { TestStore, initialValue, changedValue } from './helpers/TestStore';

let store: TestStore;

describe('Abstract store', () => {
  it('should not allow to create a direct instance of Store', () => {
    // @ts-ignore
    expect(() => new Store()).toThrowError();
  });
});

describe('Test store', () => {
  beforeAll(() => {
    store = new TestStore();
  });

  it('should create as an instance of Store', () => {
    expect(store).toBeInstanceOf(Store);
  });

  it('should create as an instance of TestStore', () => {
    expect(store).toBeInstanceOf(TestStore);
  });

  it('should provide an initial value', done => {
    const storeWithInitial = new TestStore(initialValue);
    storeWithInitial.data$.pipe(take(1)).subscribe(data => {
      expect(data).not.toBeNull();
      expect(data.message).toBe(initialValue.message);
      done();
    });
  });

  it('should trigger an init when created', done => {
    store.data$.pipe(take(1)).subscribe(data => {
      expect(data).not.toBeNull();
      expect(data.initialized).toBe(true);
      done();
    });
  });

  it('should notify when value changes', done => {
    store.methods.changeMessage();
    store.data$.pipe(take(1)).subscribe(data => {
      expect(data).not.toBeNull();
      expect(data.message).toBe(changedValue.message);
      done();
    });
  });
});
