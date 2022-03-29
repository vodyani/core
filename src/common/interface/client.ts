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
