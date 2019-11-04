import { BehaviorSubject, Observable } from 'rxjs';

export type StoreInterface<S extends Store> = Omit<S,
  'init' | 'emit' | 'data' | 'methods'
>;

export abstract class Store<T = any> {
  private _dataSource$: BehaviorSubject<T>;
  private _dataOutput$: Observable<T>;
  
  constructor(initialValue?: T) {
    if (new.target === Store) {
      throw new Error('Store is only a base for defined stores');
    }
    
    this._dataSource$ = new BehaviorSubject(initialValue || (null as any));
    this._dataOutput$ = this._dataSource$.pipe();
  }

  abstract init?(): void | Promise<void>;

  get value(): T {
    return this._dataSource$.getValue();
  }

  set value(v: T) {
    this._dataSource$.next(v);
  }

  get data$(): Observable<T> {
    return this._dataOutput$;
  }

  get methods(): StoreInterface<this> {
    return this as StoreInterface<this>;
  }
}
