import { FactoryProvider } from '../common';

import { StaticStore } from './store';

/**
 * Asynchronous provider factory for creating
 *
 * @see: [factory provider objects](https://docs.nestjs.com/fundamentals/custom-providers#factory-providers-usefactory)
 */
export class AsyncProviderFactory {
  /**
   * Create a factory provider by specifying the creation parameters externally.
   *
   * @returns FactoryProvider
   *
   * @publicApi
   */
  public create: (...args: any[]) => FactoryProvider;
  /**
   * Gets the static token for the async provider factory class.
   *
   * @returns symbol
   *
   * @publicStaticApi
   */
  public static getToken() {
    return StaticStore.get(this.name);
  }
}
