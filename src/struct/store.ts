export class FactoryProviderStore {
  private static readonly map = new Map<string, symbol>();

  public static get(key: string): symbol {
    return FactoryProviderStore.map.get(key);
  }

  public static set(key: string, token: symbol) {
    FactoryProviderStore.map.set(key, token);
  }
}
