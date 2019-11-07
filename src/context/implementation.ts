import { Store, StoreClass } from '../store';

export class Context {
  private stores = new Map<StoreClass<Store>, any>();

  getStore<T extends Store>(Store: StoreClass<T>): T {
    if (!this.stores.has(Store)) {
      const store = new Store();
      this.stores.set(Store, store);
    }

    return this.stores.get(Store)!;
  }
}
