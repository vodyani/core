import { StaticStore } from '../struct';
import { AsyncProviderFactory, Class } from '../common';

/**
 * The corresponding injected token value is obtained by passing in the asynchronous provider factory class.
 *
 * @param target The asynchronous provider factory class.
 * @returns token (symbol)
 *
 * @publicApi
 */
export function getToken(target: Class<AsyncProviderFactory>) {
  const token = StaticStore.get(target.name);
  return token;
}
