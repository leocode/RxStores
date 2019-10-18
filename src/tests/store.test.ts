import { take } from 'rxjs/operators';
import { AbstractStore } from '../store';
import { TestStore, initialValue, changedValue } from './helpers/TestStore';

let store: TestStore;

describe('Test store', () => {
  beforeAll(() => {
    store = new TestStore();
  });

  it('should create as an instance of AbstractStore', () => {
    expect(store).toBeInstanceOf(AbstractStore);
  });

  it('should create as an instance of TestStore', () => {
    expect(store).toBeInstanceOf(TestStore);
  });

  it('should provide an initial value', done => {
    store.data.pipe(take(1)).subscribe(data => {
      expect(data).not.toBeNull();
      expect(data.message).toBe(initialValue.message);
      done();
    });
  });

  it('should trigger an init when created', done => {
    store.data.pipe(take(1)).subscribe(data => {
      expect(data).not.toBeNull();
      expect(data.initialized).toBe(true);
      done();
    });
  });

  it('should notify when value changes', done => {
    store.changeMessage();
    store.data.pipe(take(1)).subscribe(data => {
      expect(data).not.toBeNull();
      expect(data.message).toBe(changedValue.message);
      done();
    });
  });
});
