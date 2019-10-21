import { AbstractStore, StoreInterface } from './AbstractStore';

type StoreClass<T extends AbstractStore> = new () => T;

type StoreModel<T> = T extends AbstractStore<infer M> ? M : never;

export {
  AbstractStore,
  StoreClass,
  StoreInterface,
  StoreModel,
};
