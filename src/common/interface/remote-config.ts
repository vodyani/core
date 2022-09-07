export interface RemoteConfigClient {
  close: (...args: any[]) => Promise<any>;
  init: <T = any>(...args: any[]) => Promise<Partial<T>>;
  sync: <T = any>(...args: any[]) => Promise<Partial<T>>;
  subscribe?: (key: string, callback: (value: any) => any) => Promise<void>;
}

export interface RemoteConfigInfo<T = any> {
  key: string;
  value?: T;
}
