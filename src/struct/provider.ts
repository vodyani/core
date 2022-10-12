import { FactoryProvider } from '@nestjs/common';

import { IAsyncProviderFactory } from '../common';

import { FactoryProviderStore } from './store';

export abstract class AsyncProviderFactory implements IAsyncProviderFactory {
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public create(...args: any[]): FactoryProvider {
    // do somethings ...
    return null;
  }
}
