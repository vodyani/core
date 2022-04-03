export abstract class ClientAdapter<T = any> {
  public instance: T;
  public close: (...arg: any) => any;
}

export abstract class AsyncClientAdapter<T = any> {
  public instance: T;
  public close: (...arg: any) => Promise<any>;
}

export abstract class ClientAdapterProvider<O = any, T = any, A = ClientAdapter<T>> {
  public create: (options: O) => A;
  public connect: (key: string) => T;
}

export abstract class AsyncClientAdapterProvider<O = any, T = any, A = AsyncClientAdapter<T>> {
  public create: (options: O) => Promise<A>;
  public connect: (key: string) => T;
}

export abstract class RemoteConfigClient {
  public init: (path: string, env: string, ...args: any[]) => Promise<any>;
  public sync?: (...args: any[]) => Promise<any>;
  public subscribe?: (callback: (details: Record<string, any>) => any) => Promise<any>;
  public close?: (...args: any[]) => Promise<any>;
}
