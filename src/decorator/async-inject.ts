import { Type, Inject } from '../common';
import { AsyncProviderFactory, StaticStore } from '../struct';

/**
 * Use this decorator to handle dependency management for asynchronous provider factory classes.
 *
 * @param target The asynchronous provider factory class.
 *
 * @publicApi
 */
export function AsyncInjectable(target: Type<AsyncProviderFactory>) {
  StaticStore.set(target.name, Symbol(target.name));
}
/**
 * Use this decorator to inject the asynchronous provider into the class instantiation process.
 *
 * @param target The asynchronous provider factory class.
 *
 * @publicApi
 */
export function AsyncInject(target: Type<AsyncProviderFactory>) {
  return Inject((target as any).getToken());
}
