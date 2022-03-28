import { Module } from '@nestjs/common';

import {
  ApiModuleOptions,
  DomainModuleOptions,
  ContainerModuleOptions,
  InfrastructureModuleOptions,
} from '../common';

/**
 * Decorator for registering domain modules.
 *
 * @publicApi
 */
export function DomainRegister(option: DomainModuleOptions) {
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
export function ApiRegister(option: ApiModuleOptions) {
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
export function InfrastructureRegister(option: InfrastructureModuleOptions) {
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
export function ContainerRegister(option: ContainerModuleOptions) {
  return Module({
    imports: option.imports,
    providers: option.aop,
  });
}
