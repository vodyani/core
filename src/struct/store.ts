export class StaticStore {
  private static readonly map = new Map<string, symbol>();

  public static get(key: string) {
    return StaticStore.map.get(key);
  }

  public static set(key: string, token: symbol) {
    StaticStore.map.set(key, token);
  }
}
