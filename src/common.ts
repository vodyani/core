import { FactoryProvider, InjectionToken, ModuleMetadata } from '@nestjs/common';
/**
 * Infrastructure Module Registration Options.
 */
export interface InfrastructureRegisterOptions {
  /**
   * Other modules that need to be imported.
   */
  imports?: ModuleMetadata['imports'];
  /**
   * Providers to be exported in the current module.
   */
  exports?: ModuleMetadata['exports'];
  /**
   * Providers in the current module.
   *
   * @required
   */
  provider: ModuleMetadata['providers'];
}
/**
 * Domain Module Registration Options.
 */
export interface DomainRegisterOptions {
  /**
   * Other modules that need to be imported.
   */
  imports?: ModuleMetadata['imports'];
  /**
   * Service entry for the domain module.
   *
   * @required
   */
  service: ModuleMetadata['providers'];
  /**
   * Managers for domain modules.
   */
  manager?: ModuleMetadata['providers'];
  /**
   * Data aggregation roots for domain modules.
   */
  repository?: ModuleMetadata['providers'];
  /**
   * Infrastructure module call and wrapper provider for domain modules.
   */
  provider?: ModuleMetadata['providers'];
  /**
   * Entity for domain modules.
   */
  entity?: ModuleMetadata['providers'];
}
/**
 * Api Module Registration Options.
 */
export interface ApiRegisterOptions {
  /**
   * Other modules that need to be imported.
   */
  imports: ModuleMetadata['imports'];
  /**
   * Controller for api modules.
   */
  controller: ModuleMetadata['controllers'];
  /**
   * Consumer for api modules.
   */
  consumer?: ModuleMetadata['providers'];
  /**
   * AOP Providers for api modules.
   */
  aop?: ModuleMetadata['providers'];
}
/**
 * App Container Module Registration Options.
 */
export interface ContainerRegisterOptions {
  /**
   * Api modules that need to be imported.
   */
  api: ModuleMetadata['imports'];
  /**
   * Infrastructure modules that need to be imported.
   */
  infrastructure: ModuleMetadata['imports'];
  /**
   * AOP Providers for global.
   */
  aop?: ModuleMetadata['providers'];
}
/**
 * Asynchronous provider factory for creating [factory provider objects](https://docs.nestjs.com/fundamentals/custom-providers#factory-providers-usefactory).
 */
export interface AsyncProviderFactory {
  /**
   * Get dependency injection `token` for factory providers.
   *
   * @returns InjectionToken
   *
   * @publicApi
   */
  getToken: () => InjectionToken;
  /**
   * Create a factory provider by specifying the creation parameters externally.
   *
   * @param ...args Arbitrary length, arbitrary type of parameters
   * @returns FactoryProvider
   *
   * @publicApi
   */
  createProvider: (...args: any[]) => FactoryProvider;
}
