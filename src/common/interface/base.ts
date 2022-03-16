import { Provider } from '@nestjs/common';

import { BaseClass, BaseModule } from '../type';

/**
 * Options for registering domain modules.
 */
export interface IDomainModuleOptions {
  /**
   * Modules that are dependent on domain modules are listed below.
   */
  imports?: BaseModule[];
  /**
   * The domain module's business instruction layer.
   *
   * This layer is in charge of downlinking `DTO` data and converting `DO` to `VO`.
   */
  service: Provider[];
  /**
   * The domain module's business processing management layer,
   *
   * which is developed from the service layer's sophisticated business sinking,
   *
   * can manage complex instructions, handle transactions, and serve as a preventative layer.
   */
  manager?: Provider[];
  /**
   * The domain data object aggregation layer in the domain module manages,
   *
   * the transformation of `DO` data and incorporates method aggregation of entity models and providers.
   */
  repository?: Provider[];
  /**
   * Clients who use providers to access other services or interact with middleware.
   */
  provider?: Provider[];
  /**
   * The entity layer, in addition to the callable interfaces allocated for the entity layer, abstracts the database's structure.
   */
  entity?: Provider[];
}
/**
 * Options for registering application interface modules.
 */
export interface IApiModuleOptions {
  /**
   * Modules that are dependent on application interface modules are listed below.
   */
  imports?: BaseModule[];
  /**
   * Control layer for the http interface
   */
  controller: BaseClass[];
  /**
   * Customer layer, where consumer actions, such as subscriptions, are acknowledged and consumers interact.
   */
  consumer?: Provider[];
  /**
   * Interceptors, guardians, filters, and pipes are examples of control layer aop middleware.
   */
  aop?: Provider[];
}
/**
 * Options for registering infrastructure modules.
 */
export interface IInfrastructureModuleOptions {
  /**
   * Modules that are dependent on infrastructure modules are listed below.
   */
  imports?: BaseModule[];
}
/**
 * Options for registering global container modules.
 */
export interface IContainerModuleOptions {
  /**
   * Modules that are dependent on global container modules are listed below.
   */
  imports?: BaseModule[];
  /**
   * Interceptors, guardians, filters, and pipes are examples of global container aop middleware.
   */
  aop?: Provider[];
}
