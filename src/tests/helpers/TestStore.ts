import { AbstractStore } from '../../store';

interface Model {
  message: string;
  initialized?: boolean;
}

export const initialValue: Model = { message: 'Hello, test!' };
export const changedValue: Model = { message: 'Data changed.' };

export class TestStore extends AbstractStore<Model> {
  constructor() {
    super(initialValue);
  }

  init() {
    this.dataSource.next({ ...initialValue, initialized: true });
  }

  changeMessage() {
    this.dataSource.next(changedValue);
  }
}
