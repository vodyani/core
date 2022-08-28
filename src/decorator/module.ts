import {
  ApiRegisterOptions,
  ContainerRegisterOptions,
  DomainRegisterOptions,
  InfrastructureRegisterOptions,
  Module,
} from '../common';

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
export function Infrastructure(options: InfrastructureRegisterOptions) {
  return Module({
    imports: options.import || [],
    exports: options.export || [],
    providers: options.provider,
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
export function Domain(options: DomainRegisterOptions) {
  return Module({
    imports: options.import || [],
    exports: options.service,
    providers: [
      ...options.service,
      ...(options.manager || []),
      ...(options.repository || []),
      ...(options.provider || []),
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
export function Api(options: ApiRegisterOptions) {
  return Module({
    imports: options.import || [],
    controllers: options.controller,
    providers: [
      ...(options.aop || []),
      ...(options.consumer || []),
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
export function Container(options: ContainerRegisterOptions) {
  const { aop, api, infrastructure } = options;

  return Module({
    imports: [
      ...(api || []),
      ...(infrastructure || []),
    ],
    providers: aop || [],
  });
}
