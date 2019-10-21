import { Store } from '../../store';

interface Model {
  message: string;
  initialized?: boolean;
}

export const initialValue: Model = { message: 'Hello, test!' };
export const changedValue: Model = { message: 'Data changed.' };

export class TestStore extends Store<Model> {
  constructor(initialValue?: Model) {
    super(initialValue);
  }

  init() {
    this.value = { ...initialValue, initialized: true };
  }

  changeMessage() {
    // @ts-ignore
    const oldValue = this.value;

    this.value = changedValue;
  }
}
