import { BehaviorSubject, Observable } from 'rxjs';

export type StoreInterface<Store extends AbstractStore> = Omit<Store, 'data' | 'methods'>;

export abstract class AbstractStore<T = any> {
  protected dataSource: BehaviorSubject<T>;
  private dataOutput: Observable<T>;
  
  constructor(initialValue?: T) {
    if (new.target === AbstractStore) {
      throw new TypeError('AbstractStore is only a base for defined stores');
    }
    
    this.dataSource = new BehaviorSubject(initialValue || (null as any));
    this.dataOutput = this.dataSource.pipe();

    this.init();
  }

  get data(): Observable<T> {
    return this.dataOutput;
  }

  get methods(): StoreInterface<this> {
    return this as StoreInterface<this>;
  }

  abstract init(): void | Promise<void>;
}
