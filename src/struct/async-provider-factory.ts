import { StaticStore } from './store';

export abstract class AsyncProvider {
  /**
   * Gets the static token for the async provider factory class.
   *
   * @returns symbol
   *
   * @publicStaticApi
   */
  public static getToken() {
    return StaticStore.get(this.name);
  }
}
