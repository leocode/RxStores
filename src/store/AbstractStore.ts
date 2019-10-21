import { BehaviorSubject, Observable } from 'rxjs';

export type StoreInterface<Store extends AbstractStore> = Omit<Store,
  'init' | 'emit' | 'data' | 'methods'
>;

export abstract class AbstractStore<T = any> {
  private dataSource: BehaviorSubject<T>;
  private dataOutput: Observable<T>;
  
  constructor(initialValue?: T) {
    if (new.target === AbstractStore) {
      throw new TypeError('AbstractStore is only a base for defined stores');
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
