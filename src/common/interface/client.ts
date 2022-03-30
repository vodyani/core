export interface Client<T = any> {
  /**
   * Client instance.
   */
  instance: T;
  /**
   * Close client instance.
   */
  close: (...arg: any) => any;
}
export interface AsyncClient<T = any> {
  /**
   * Client instance.
   */
  instance: T;
  /**
   * Close client instance.
   */
  close: (...arg: any) => Promise<any>;
}
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
/**
 * Remote Configuration Client (Configuration Center).
 */
export interface RemoteConfigClient {
  /**
   * Initialize remote configuration client.
   */
  init: (path: string, env: string, ...args: any[]) => Promise<any>;
  /**
   * Full synchronization of configuration client data.
   */
  sync?: (...args: any[]) => Promise<any>;
  /**
   * Subscribe to configuration pushes from remote clients.
   */
  subscribe?: (callback: (details: Record<string, any>) => any) => Promise<any>;
  /**
   * Close the remote client.
   */
  close?: (...args: any[]) => Promise<any>;
}
/**
 * Remote Configuration details item.
 */
export interface RemoteConfigDetails<OPTIONS = any, EXTRA = any> {
  /**
   * Key for querying remote configuration.
   */
  key: string;
  /**
   * The configuration information returned by the remote configuration client.
   */
  options?: OPTIONS;
  /**
   * Additional additional parameter objects required.
   */
  extra?: EXTRA;
}

