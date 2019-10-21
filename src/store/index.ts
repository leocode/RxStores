import { Store, StoreInterface } from './Store';

type StoreClass<T extends Store> = new () => T;

type StoreModel<T> = T extends Store<infer M> ? M : never;

export {
  Store,
  StoreClass,
  StoreInterface,
  StoreModel,
};
