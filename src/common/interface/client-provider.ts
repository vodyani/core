import { Client, AsyncClient } from './client';

/**
 * Client-side function providers.
 */
export interface ClientProvider<CLIENT = any, OPTION = any> {
  /**
   * Client creation method.
   */
  create: (option: OPTION) => Client<CLIENT>;
  /**
   * Client connection method.
   */
  connect: (key: string) => CLIENT;
}
/**
 * Client-side function providers that need to be created asynchronously.
 */
export interface AsyncClientProvider<CLIENT = any, OPTION = any> {
  /**
   * Client creation method.
   */
  create: (option: OPTION) => Promise<AsyncClient<CLIENT>>;
  /**
   * Client connection method.
   */
  connect: (key: string) => CLIENT;
}
