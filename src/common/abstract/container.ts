export abstract class Container {
  public static registry: (...args: any[]) => void;
  public static discovery: <T = any>(...args: any[]) => T;
}
