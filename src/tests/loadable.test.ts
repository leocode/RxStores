import { Loadable } from '../helpers';

interface TestModel {
  x: number;
}

describe('Helper Loadable', () => {
  it('should construct a data state', () => {
    const state = Loadable.ofData<TestModel>({ x: 5 });
    expect(state.data).toEqual({ x: 5 });
    expect(state.error).toBeNull();
    expect(state.loading).toBe(false);
  });

  it('should construct a loading state', () => {
    const state = Loadable.ofLoading();
    expect(state.data).toBeNull();
    expect(state.error).toBeNull();
    expect(state.loading).toBe(true);
  });

  it('should construct an error state', () => {
    const state = Loadable.ofError(new Error('Something went wrong'));
    expect(state.data).toBeNull();
    expect(state.error).toBeInstanceOf(Error);
    expect(state.loading).toBe(false);
  });

  it('should allow to construct an empty state', () => {
    expect(() => {
      const state = new Loadable<TestModel, Error>();
      expect(state.data).toBeNull();
      expect(state.error).toBeNull();
      expect(state.loading).toBe(false);
    }).not.toThrow();
  });

  it('should allow to construct a custom state', () => {
    expect(() => {
      const state = new Loadable<TestModel, Error>(
        { x: 5 },
        new Error('Test error'),
        true
      );
      expect(state.data).toEqual({ x: 5 });
      expect(state.error).toBeInstanceOf(Error);
      expect(state.loading).toBe(true);
    }).not.toThrow();
  })
});
