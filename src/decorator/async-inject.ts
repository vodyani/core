import { Inject } from '@nestjs/common';

import { getToken } from '../method';
import { StaticStore } from '../struct';
import { AsyncProviderFactory, Class } from '../common';

/**
 * Use this decorator to handle dependency management for asynchronous provider factory classes.
 *
 * @param target The asynchronous provider factory class.
 *
 * @publicApi
 */
export function AsyncInjectable(target: Class<AsyncProviderFactory>) {
  StaticStore.set(target.name);
}
/**
 * Use this decorator to inject the asynchronous provider into the class instantiation process.
 *
 * @param target The asynchronous provider factory class.
 *
 * @publicApi
 */
export function AsyncInject(target: Class<AsyncProviderFactory>) {
  const token = getToken(target);
  return Inject(token);
}
