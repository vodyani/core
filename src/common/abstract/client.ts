export abstract class AnyAdapter {
  [key: string]: any;
}

export abstract class ClientAdapter<T = any> extends AnyAdapter {
  public instance: T;
  public close: (...arg: any) => any;
}

export abstract class AsyncClientAdapter<T = any> extends AnyAdapter {
  public instance: T;
  public close: (...arg: any) => Promise<any>;
}

export abstract class ClientAdapterProvider<T = any, O = any> {
  public create: (options: O) => ClientAdapter<T>;
  public connect: (key: string) => T;
}

export abstract class AsyncClientAdapterProvider<O = any, T = any> {
  public create: (options: O) => Promise<AsyncClientAdapter<T>>;
  public connect: (key: string) => T;
}

export abstract class RemoteConfigClient {
  public init: (...args: any[]) => Promise<any>;
  public sync?: (...args: any[]) => Promise<any>;
  public subscribe?: (callback: (config: Record<string, any>) => any) => Promise<any>;
  public close?: (...args: any[]) => Promise<any>;
}
