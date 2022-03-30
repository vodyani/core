export interface ClientAdapter<T = any> {
  /**
   * Client instance.
   */
  instance: T;
  /**
   * Close client instance.
   */
  close: (...arg: any) => any;
}

export interface AsyncClientAdapter<T = any> {
  /**
   * Client instance.
   */
  instance: T;
  /**
   * Close client instance.
   */
  close: (...arg: any) => Promise<any>;
}

export interface ClientAdapterProvider<T = any, O = any> {
  /**
   * ClientAdapter creation method.
   */
  create: (options: O) => ClientAdapter<T>;
  /**
   * ClientAdapter connection method.
   */
  connect: (key: string) => T;
}

export interface AsyncClientAdapterProvider<T = any, O = any> {
  /**
   * ClientAdapter creation method.
   */
  create: (options: O) => Promise<AsyncClientAdapter<T>>;
  /**
   * ClientAdapter connection method.
   */
  connect: (key: string) => T;
}

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

