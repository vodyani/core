/**
 * A container that uses a Map structure to store instances.
 */
export class InstanceContainer<K = any, V = any> {
  /**
   * Instances store map.
   */
  private readonly store: Map<K, V> = new Map();
  /**
   * Set an instance to the container map.
   *
   * @param key instance token.
   * @param value instance.
   *
   * @publicApi
   */
  public set(key: K, value: V) {
    this.store.set(key, value);
  }
  /**
   * Get instance.
   *
   * @param key instance token.
   *
   * @publicApi
   */
  public get(key: K) {
    return this.store.get(key) || null;
  }
}
