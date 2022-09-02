import { FactoryProvider } from '../declare';

/**
 * Asynchronous provider factory for creating
 *
 * @see: [factory provider objects](https://docs.nestjs.com/fundamentals/custom-providers#factory-providers-usefactory)
 */
export interface AsyncProviderFactory {
  /**
   * Create a factory provider by specifying the creation parameters externally.
   *
   * @returns FactoryProvider
   *
   * @publicApi
   */
  create: (...args: any[]) => FactoryProvider;
}
