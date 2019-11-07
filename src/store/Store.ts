import { BehaviorSubject, Observable } from 'rxjs';

export type StoreInterface<S extends Store> = Omit<S,
  'init' | 'data$' | 'methods' | 'value'
>;

export abstract class Store<T = any> {
  private _dataSource$: BehaviorSubject<T>;
  private _dataOutput$: Observable<T>;
  private _initialized: Promise<void>;
  
  constructor(initialValue?: T) {
    if (new.target === Store) {
      throw new Error('Store is only a base for defined stores');
    }
    
    this._dataSource$ = new BehaviorSubject(initialValue || (null as any));
    this._dataOutput$ = this._dataSource$.pipe();
    this._initialized = new Promise(resolve => this._init(resolve));
  }

  init(): void | Promise<void> {}

  private _init(resolve: () => void): void {
    if (typeof this.init !== 'function') {
      return resolve();
    }
    const initResult = this.init();
    if (initResult != null && initResult['then'] != null) {
      initResult.then(resolve);
    }
  }

  get waitUntilInitialized() {
    return this._initialized;
  }

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
