import { AbstractStore, StoreInterface } from './AbstractStore';

export type StoreClass<T extends AbstractStore> = new () => T;

export {
  AbstractStore,
  StoreInterface
};
