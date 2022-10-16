export interface IObserver {
  /**
  * Register the subscriber inside client.
  *
  * @param ...args: any[]
  *
  * @publicApi
  */
  subscribe: (...args: any[]) => void | Promise<void>;
  /**
  * Remove the subscriber from client.
  *
  * @param ...args: any[]
  *
  * @publicApi
  */
  unSubscribe: (...args: any[]) => void;
  /**
  * Notify subscribers of configuration updates.
  *
  * @param ...args: any[]
  *
  * @publicApi
  */
  notify: (...args: any[]) => void;
}

export interface IConfig<T = any> {
  /**
   * Deep search the configuration with property key.
   *
   * @param key string The property of configuration.
   *
   * @publicApi
   */
  get: <V = any>(key: string) => V;
  /**
   * Search the configuration with property key.
   *
   * @param key string The property of configuration.
   *
   * @publicApi
   */
  search: <K extends keyof T>(key: K) => T[K]
  /**
   * Replace the configuration with property key.
   *
   * @param key string The property of configuration.
   * @param value any The configuration value.
   *
   * @publicApi
   */
  replace: (key: string, value: any) => void;
  /**
   * Merge the configuration.
   *
   * @param config any The configuration.
   *
   * @publicApi
   */
  merge: (config: T) => void;
}

export interface IConfigSubscriber {
  /**
   * Updating Configuration.
   *
   * @param key string The property of configuration.
   * @param value any The configuration value.
   *
   * @publicApi
   */
  update: (key: string, value: any) => void | Promise<void>
}

export interface IConfigClientSubscriber {
  /**
   * Updating Configuration.
   *
   * @param value any The configuration value.
   *
   * @publicApi
   */
  update: (value: any) => void | Promise<void>
}

export interface IConfigLoader<T = any> {
  /**
   * Load configuration.
   *
   * @publicApi
   */
  execute: () => T | Promise<T>;
}

export interface IConfigPoller {
  /**
   * Open the polling.
   *
   * @publicApi
   */
  execute: () => void;
  /**
   * Close the polling.
   *
   * @publicApi
   */
  close: () => void | Promise<void>;
}

export interface IConfigObserver extends IObserver {
  /**
  * Register the subscriber inside client by the key of configuration.
  *
  * @param key string The key of configuration.
  * @param subscriber IConfigSubscriber The configuration subscriber.
  *
  * @publicApi
  */
  subscribe: (key: string, subscriber: IConfigSubscriber) => void;
  /**
  * Remove the subscriber from client by the key of configuration..
  *
  * @param key string The key of configuration.
  *
  * @publicApi
  */
  unSubscribe: (key: string) => void;
  /**
  * Notify subscribers of configuration updates.
  *
  * @param key string The key of configuration.
  * @param value any The configuration value.
  *
  * @publicApi
  */
  notify: (key: string, value: any) => void;
  /**
  * Open the polling.
  *
  * @publicApi
  */
  polling: (...args: any[]) => void;
  /**
  * Close the polling.
  *
  * @publicApi
  */
  unPolling: () => void;
}

export interface IConfigClient<T = any> extends IObserver {
  /**
   * Load configuration.
   *
   * @param loader: IConfigLoader<T>
   *
   * @publicApi
   */
  init: (loader: IConfigLoader) => T | Promise<T>;
  /**
  * Register the subscriber inside client.
  *
  * @param subscriber IConfigClientSubscriber The configuration client subscriber.
  *
  * @publicApi
  */
  subscribe: (subscriber: IConfigClientSubscriber) => void;
  /**
  * Remove the subscriber from client.
  *
  * @publicApi
  */
  unSubscribe: () => void;
  /**
  * Notify subscribers of configuration updates.
  *
  * @param value any The configuration value.
  *
  * @publicApi
  */
  notify: (value: any) => void;
  /**
  * Open the polling.
  *
  * @publicApi
  */
  polling: (...args: any[]) => void;
  /**
  * Close the polling.
  *
  * @publicApi
  */
  unPolling: () => void;
}
