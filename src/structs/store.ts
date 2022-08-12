export class StaticStore {
  private static readonly map = new Map<string, symbol>();

  public static get(key: string) {
    return StaticStore.map.get(key);
  }

  public static set(key: string) {
    StaticStore.map.set(key, Symbol(key));
  }
}
