import { FactoryProvider } from '../common';

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
   *
   * @returns this.name
   *
   * @publicApi
   */
  public static getToken() {
    return this.name;
  }
}
