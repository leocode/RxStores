import { BehaviorSubject, Observable } from 'rxjs';

export type StoreInterface<S extends Store> = Omit<S,
  'init' | 'emit' | 'data' | 'methods'
>;

export abstract class Store<T = any> {
  private dataSource: BehaviorSubject<T>;
  private dataOutput: Observable<T>;
  
  constructor(initialValue?: T) {
    if (new.target === Store) {
      throw new Error('Store is only a base for defined stores');
    }
    
    this.dataSource = new BehaviorSubject(initialValue || (null as any));
    this.dataOutput = this.dataSource.pipe();

    if (typeof this.init === 'function') {
      this.init();
    } else {
      throw new Error('Init function is not defined');
    }
  }

  abstract init(): void | Promise<void>;

  protected emit(value: T): void {
    this.dataSource.next(value);
  }

  get value(): T {
    return this.dataSource.getValue();
  }

  get data(): Observable<T> {
    return this.dataOutput;
  }

  get methods(): StoreInterface<this> {
    return this as StoreInterface<this>;
  }
}
