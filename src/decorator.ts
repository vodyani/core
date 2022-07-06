import { Module } from '@nestjs/common';

import {
  ApiRegisterOptions,
  ContainerRegisterOptions,
  DomainRegisterOptions,
  InfrastructureRegisterOptions,
} from './common';

/**
 * Decorator of Infrastructure Module Register.
 *
 * This decorator is responsible for declaring an infrastructure module based on the options passed in.
 *
 * @param options InfrastructureRegisterOptions
 * @returns [Modules](https://docs.nestjs.com/modules)
 *
 * @publicApi
 */
export function InfrastructureRegister(options: InfrastructureRegisterOptions) {
  const { imports, exports, provider } = options;

  return Module({
    imports,
    exports: exports || [],
    providers: provider || [],
  });
}
/**
 * Decorator of Domain Module Register.
 *
 * This decorator is responsible for declaring an domain module based on the options passed in.
 *
 * @param options DomainRegisterOptions
 * @returns [Modules](https://docs.nestjs.com/modules)
 *
 * @publicApi
 */
export function DomainRegister(options: DomainRegisterOptions) {
  const { imports, service, manager, repository, provider, entity } = options;

  return Module({
    imports,
    providers: [
      ...service,
      ...(manager || []),
      ...(repository || []),
      ...(provider || []),
      ...(entity || []),
    ],
  });
}
/**
 * Decorator of Api Module Register.
 *
 * This decorator is responsible for declaring an api module based on the options passed in.
 *
 * @param options ApiRegisterOptions
 * @returns [Modules](https://docs.nestjs.com/modules)
 *
 * @publicApi
 */
export function ApiRegister(options: ApiRegisterOptions) {
  const { imports, aop, consumer, controller } = options;

  return Module({
    imports,
    controllers: controller,
    providers: [
      ...(aop || []),
      ...(consumer || []),
    ],
  });
}
/**
 * Decorator of App Container Module Register.
 *
 * This decorator is responsible for declaring an app container module based on the options passed in.
 *
 * @param options ContainerRegisterOptions
 * @returns [Modules](https://docs.nestjs.com/modules)
 *
 * @publicApi
 */
export function ContainerRegister(options: ContainerRegisterOptions) {
  const { aop, api, infrastructure } = options;

  return Module({
    imports: [
      ...api,
      ...infrastructure,
    ],
    providers: aop,
  });
}
