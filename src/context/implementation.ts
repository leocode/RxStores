import { AbstractStore, StoreClass } from '../store';

export class Context {
  private stores = new Map<StoreClass<AbstractStore>, any>();

  getStore<T extends AbstractStore>(Store: StoreClass<T>): T {
    if (!this.stores.has(Store)) {
      this.stores.set(Store, new Store());
    }

    return this.stores.get(Store)!;
  }
}
