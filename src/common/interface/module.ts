import { ModuleMetadata } from '../declare';

/**
 * Infrastructure module registration options.
 */
export interface InfrastructureRegisterOptions {
  /**
   * Optional list of imported modules that export the providers which are required in this module.
   */
  import?: ModuleMetadata['imports'];
  /**
   * Optional list of providers that will be instantiated by the Nest injector and that may be shared at least across this module.
   */
  export?: ModuleMetadata['exports'];
  /**
   * Optional list of providers that will be instantiated by the Nest injector and that may be shared at least across this module.
   *
   * @required
   */
  provider: ModuleMetadata['providers'];
}
/**
 * Domain module registration options.
 */
export interface DomainRegisterOptions {
  /**
   * Optional list of imported modules that export the providers which are required in this module.
   */
  import?: ModuleMetadata['imports'];
  /**
   * Optional list of `service` providers that will be instantiated by the Nest injector and that may be shared at least across this module.
   *
   * @tips In domain, only services are exported.
   *
   * @required
   */
  service: ModuleMetadata['providers'];
  /**
   * Optional list of `manager` providers that will be instantiated by the Nest injector and that may be shared at least across this module.
   */
  manager?: ModuleMetadata['providers'];
  /**
   * Optional list of `repository` providers that will be instantiated by the Nest injector and that may be shared at least across this module.
   */
  repository?: ModuleMetadata['providers'];
  /**
   * Optional list of providers that will be instantiated by the Nest injector and that may be shared at least across this module.
   */
  provider?: ModuleMetadata['providers'];
}
/**
 * Api module registration options.
 */
export interface ApiRegisterOptions {
  /**
   * Optional list of imported modules that export the providers which are required in this module.
   */
  import?: ModuleMetadata['imports'];
  /**
   * Optional list of controllers defined in this module which have to be instantiated.
   *
   * @required
   */
  controller: ModuleMetadata['controllers'];
  /**
   * Optional list of `consumer` that will be instantiated by the Nest injector and that may be shared at least across this module.
   */
  consumer?: ModuleMetadata['providers'];
  /**
   * Optional list of `AOP` providers that will be instantiated by the Nest injector and that may be shared at least across this module.
   */
  aop?: ModuleMetadata['providers'];
}
/**
 * Application container module registration options.
 */
export interface ContainerRegisterOptions {
  /**
   * Api modules that need to be imported.
   */
  api?: ModuleMetadata['imports'];
  /**
   * Infrastructure modules that need to be imported.
   */
  infrastructure?: ModuleMetadata['imports'];
  /**
   * Optional list of `AOP` providers that will be instantiated by the Nest injector and that may be shared at least across this module.
   */
  aop?: ModuleMetadata['providers'];
}
