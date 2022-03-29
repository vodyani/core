export interface Client<CLIENT = any> {
  /**
   * Client instance.
   */
  client: CLIENT;
  /**
   * Close client instance.
   */
  close: () => void;
}
export interface AsyncClient<CLIENT = any> {
  /**
   * Client instance.
   */
  client: CLIENT;
  /**
   * Close client instance.
   */
  close: () => Promise<void>;
}
