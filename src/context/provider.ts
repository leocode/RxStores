import { Context } from './implementation';
import { Store, StoreClass } from '../store';

export interface ContextProviderInterface {
  getStore<T extends Store>(Store: StoreClass<T>): Promise<T>;
  from(contextKey: string): Pick<ContextProviderInterface, 'getStore'>;
}

export class ContextProvider implements ContextProviderInterface {
  private readonly contexts = new Map<string, Context>();

  private static readonly GLOBAL_CONTEXT = '__global';

  private async _getStore<T extends Store>(Store: StoreClass<T>, contextKey: string): Promise<T> {
    if (!this.contexts.has(contextKey)) {
      this.contexts.set(contextKey, new Context());
    }
    const context = this.contexts.get(contextKey)!;
    return context.getStore(Store);
  }

  async getStore<T extends Store>(Store: StoreClass<T>): Promise<T> {
    return this._getStore(Store, ContextProvider.GLOBAL_CONTEXT);
  }

  from(contextKey: string): Pick<this, 'getStore'> {
    return {
      getStore: Store => this._getStore(Store, contextKey),
    };
  }
}

const instance: ContextProviderInterface = new ContextProvider();

export { instance as Provider };
