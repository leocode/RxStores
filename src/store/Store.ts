import { BehaviorSubject, Observable } from 'rxjs';

export type StoreInterface<S extends Store> = Omit<S,
  'init' | 'emit' | 'data' | 'methods'
>;

export abstract class Store<T = any> {
  private dataSource: BehaviorSubject<T>;
  private dataOutput: Observable<T>;
  
  constructor(initialValue?: T) {
    if (new.target === Store) {
      throw new TypeError('Store is only a base for defined stores');
    }
    
    this.dataSource = new BehaviorSubject(initialValue || (null as any));
    this.dataOutput = this.dataSource.pipe();

    this.init();
  }

  abstract init(): void | Promise<void>;

  protected emit(value: T): void {
    this.dataSource.next(value);
  }

  protected get value(): T {
    return this.dataSource.getValue();
  }

  get data(): Observable<T> {
    return this.dataOutput;
  }

  get methods(): StoreInterface<this> {
    return this as StoreInterface<this>;
  }
}
