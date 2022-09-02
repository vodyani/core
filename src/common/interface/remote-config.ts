export interface RemoteConfigClient {
  init: (...args: any[]) => Promise<any>;
  close: (...args: any[]) => Promise<void>;
  sync: (...args: any[]) => Promise<any>;
  subscribe?: (key: string, callback: (value: any) => any) => Promise<void>;
}

export interface RemoteConfigInfo<T = any> {
  key: string;
  value?: T;
}
