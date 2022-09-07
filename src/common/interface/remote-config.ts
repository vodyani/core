export interface RemoteConfigClient {
  close?: (...args: any[]) => Promise<any>;
  init: (...args: any[]) => Promise<Partial<any>>;
  sync: (...args: any[]) => Promise<Partial<any>>;
  subscribe?: (key: string, callback: (value: any) => any) => Promise<void>;
}

export interface RemoteConfigInfo<T = any> {
  key: string;
  value?: T;
}
