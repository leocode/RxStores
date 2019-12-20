import { BehaviorSubject, Observable } from "rxjs";
import { filter, take, mapTo } from "rxjs/operators";

type StoreInterfaceKeys = "init" | "methods" | "value" | "outputs";

export type StoreInterface<S extends Store> = Omit<S, StoreInterfaceKeys>;

export type StoreOutputs<S extends Store> = {
  [P in keyof S]: S[P] extends Observable<any>
  ? S[P]
  : never;
};

export type StoreOutputKeys<S extends Store> = keyof StoreOutputs<S>;

export type StoreParametrizedOutput<T> = (key: string) => Observable<T>;

export abstract class Store<T = any> {
  private _dataSource$: BehaviorSubject<T>;
  private _dataOutput$: Observable<T>;
  private _initialized: Promise<any>;

  constructor(initialValue?: T) {
    if (new.target === Store) {
      throw new Error(
        "Won't construct an abstract store. Extend this class to create a store."
      );
    }

    this._dataSource$ = new BehaviorSubject<T>(initialValue || (null as any));
    this._dataOutput$ = this._dataSource$.pipe();
    this._initialized = this._dataSource$
      .pipe(
        filter(d => d != null),
        take(1),
        mapTo(null)
      )
      .toPromise();
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

  get outputs(): StoreOutputs<this> {
    return this as StoreOutputs<this>;
  }

  createCustomOutput<Out, In extends Observable<any>>(
    factory: (in$: Observable<T>) => Observable<Out>,
    input$: In = this.data$ as In
  ): Observable<Out> {
    return factory(input$);
  }

  createParametrizedOutput<In extends Observable<any>, Out>(
    factory: (in$: Observable<T>) => StoreParametrizedOutput<Out>,
    input$: In = this.data$ as In
  ): StoreParametrizedOutput<Out> {
    const _cache = new Map<string, Observable<Out>>();
    const input = factory(input$);

    const getter: StoreParametrizedOutput<Out> = key => {
      if (_cache.has(key)) {
        return _cache.get(key) as NonNullable<Observable<Out>>;
      }
      const output = input(key);
      _cache.set(key, output);
      return output;
    };

    return getter;
  }
}
