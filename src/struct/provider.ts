import { FactoryProvider } from '@nestjs/common';

import { IAsyncProviderFactory } from '../common';

import { FactoryProviderStore } from './store';

export abstract class AsyncProviderFactory implements IAsyncProviderFactory {
  abstract create: (...args: any[]) => FactoryProvider<any>;

  /**
   * Gets the static token for the async provider factory class.
   *
   * @returns symbol
   *
   * @publicStaticApi
   */
  public static getToken() {
    return FactoryProviderStore.get(this.name);
  }
}
