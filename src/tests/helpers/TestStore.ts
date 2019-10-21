import { AbstractStore } from '../../store';

interface Model {
  message: string;
  initialized?: boolean;
}

export const initialValue: Model = { message: 'Hello, test!' };
export const changedValue: Model = { message: 'Data changed.' };

export class TestStore extends AbstractStore<Model> {
  constructor(initialValue?: Model) {
    super(initialValue);
  }

  init() {
    this.emit({ ...initialValue, initialized: true });
  }

  changeMessage() {
    // @ts-ignore
    const oldValue = this.value;

    this.emit(changedValue);
  }
}
