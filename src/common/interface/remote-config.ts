export interface RemoteConfigClient {
  /**
   * Close the remote configuration center.
   *
   * @publicApi
   */
  close?: (...args: any[]) => Promise<any>;
  /**
   * Periodic synchronization of configuration information (polling).
   *
   * @publicApi
   */
  sync?: () => Promise<any>;
  /**
   * Subscribe to configuration information (callbacks or hot updates).
   *
   * @publicApi
   */
  subscribe?: (callback: (config: any) => any) => Promise<any>;
  /**
   * Use customize arguments to initialize the remote configuration center.
   *
   * @publicApi
   */
  init: (...args: any[]) => Promise<Partial<any>>;
}

export interface RemoteConfigInfo<T = any> {
  /**
   * Key in the remote configuration center.
   */
  key: string;
  /**
   * Indicates the actual configuration value.
   */
  value?: T;
}
