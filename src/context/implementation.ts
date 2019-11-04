import { Store, StoreClass } from '../store';

export class Context {
  private stores = new Map<StoreClass<Store>, any>();

  async getStore<T extends Store>(Store: StoreClass<T>): Promise<T> {
    if (!this.stores.has(Store)) {
      const store = new Store();
      if (typeof store.init === 'function') {
        await store.init();
      }
      this.stores.set(Store, store);
    }

    return this.stores.get(Store)!;
  }
}
