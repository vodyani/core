export interface ClientAdapter<T = any> {
  instance: T;
  close: (...arg: any) => any;
}

export interface AsyncClientAdapter<T = any> {
  instance: T;
  close: (...arg: any) => Promise<any>;
}

export interface ClientAdapterProvider<T = any, O = any> {
  create: (options: O) => ClientAdapter<T>;
  connect: (key: string) => T;
}

export interface AsyncClientAdapterProvider<T = any, O = any> {
  create: (options: O) => Promise<AsyncClientAdapter<T>>;
  connect: (key: string) => T;
}

export interface RemoteConfigClient {
  init: (path: string, env: string, ...args: any[]) => Promise<any>;
  sync?: (...args: any[]) => Promise<any>;
  subscribe?: (callback: (details: Record<string, any>) => any) => Promise<any>;
  close?: (...args: any[]) => Promise<any>;
}

export interface RemoteConfigDetails<OPTIONS = any, EXTRA = any> {
  key: string;
  options?: OPTIONS;
  extra?: EXTRA;
}

