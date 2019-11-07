import { Context } from '../context/implementation';
import { TestStore } from './helpers/TestStore';
import { take } from 'rxjs/operators';

let context: Context;

describe('Context', () => {
  beforeEach(() => {
    context = new Context();
  });
  
  it('should create as an instance of Context', () => {
    expect(context).toBeInstanceOf(Context);
  });

  it('should lazy initialize and return an instance of test Store interface', async done => {
    const testStore = context.getStore(TestStore);

    expect(testStore).toBeInstanceOf(TestStore);

    testStore.data$.pipe(take(1)).subscribe(data => {
      expect(data.initialized).toBe(true);
      done();
    });
  });

  it('reuse an existing Store instance in the context', async () => {
    const storeA = context.getStore(TestStore);
    const storeB = context.getStore(TestStore);

    expect(storeA).toBe(storeB);
  });
});
