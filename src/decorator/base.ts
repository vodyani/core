import { Module } from '@nestjs/common';

import {
  IApiModuleOptions,
  IDomainModuleOptions,
  IContainerModuleOptions,
  IInfrastructureModuleOptions,
} from '../common';

/**
 * Decorator for registering domain modules.
 *
 * @publicApi
 */
export function DomainRegister(option: IDomainModuleOptions) {
  return Module({
    exports: option.service,
    imports: option.imports,
    providers: [
      ...option.service,
      ...(option.manager || []),
      ...(option.repository || []),
      ...(option.provider || []),
      ...(option.entity || []),
    ],
  });
}
/**
 * Decorator for registering application interface modules.
 *
 * @publicApi
 */
export function ApiRegister(option: IApiModuleOptions) {
  return Module({
    imports: option.imports,
    providers: [
      ...(option.aop || []),
      ...(option.consumer || []),
    ],
    controllers: option.controller,
  });
}
/**
 * Decorator for registering infrastructure modules.
 *
 * @publicApi
 */
export function InfrastructureRegister(option: IInfrastructureModuleOptions) {
  return Module({
    imports: option.imports,
    exports: option.imports,
  });
}
/**
 * Decorator for registering global container modules.
 *
 * @publicApi
 */
export function ContainerRegister(option: IContainerModuleOptions) {
  return Module({
    imports: option.imports,
    providers: option.aop,
  });
}
