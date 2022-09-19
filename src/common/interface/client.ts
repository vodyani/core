export interface Client<T = any> {
  /**
   * Gets the client instance object.
   *
   * @publicApi
   */
  getInstance: () => T;
  /**
   * Close the client instance.
   *
   * @publicApi
   */
  close: (...args: any[]) => void;
}

export interface AsyncClient<T = any> {
  /**
   * Gets the client instance object.
   *
   * @publicApi
   */
  getInstance: () => T;
  /**
   * Close the client instance.
   *
   * @publicApi
   */
  close: (...args: any[]) => Promise<void>;
}

export interface ClientAdapter<T = any, O = any> {
  /**
   * Creating the client.
   *
   * @publicApi
   */
  create: (options: O) => Client<T>;
  /**
   * Gets the client.
   *
   * @publicApi
   */
  getClient: (key: string) => Client<T>;
  /**
   * Gets the client instance object.
   *
   * @publicApi
   */
  getInstance: (key: string) => T;

}

export interface AsyncClientAdapter<T = any, O = any> {
  /**
   * Creating the client.
   *
   * @publicApi
   */
  create: (options: O) => Promise<AsyncClient<T>>;
  /**
   * Gets the client.
   *
   * @publicApi
   */
  getClient: (key: string) => AsyncClient<T>;
  /**
   * Gets the client instance object.
   *
   * @publicApi
   */
  getInstance: (key: string) => T;
}
