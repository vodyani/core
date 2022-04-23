export abstract class StoreContainer {
  public static registry: (...args: any[]) => void;
  public static discovery: <T = any>(...args: any[]) => T;
}
