import { FactoryProvider } from '@nestjs/common';

export interface IAsyncProviderFactory {
  /**
   * Create a factory provider by specifying the creation parameters externally.
   *
   * @see: [factory provider objects](https://docs.nestjs.com/fundamentals/custom-providers#factory-providers-usefactory)
   *
   * @returns FactoryProvider
   *
   * @publicApi
   */
  create: (...args: any[]) => FactoryProvider;
}
