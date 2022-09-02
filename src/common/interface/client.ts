export interface Client<T = any> {
  getInstance: () => T;
  close: (...args: any[]) => void;
}

export interface AsyncClient<T = any> {
  getInstance: () => T;
  close: (...args: any[]) => Promise<void>;
}

export interface ClientAdapter<T = any, O = any> {
  getClient: (key: string) => Client<T>;
  create: (options: O) => Client<T>;
}

export interface AsyncClientAdapter<T = any, O = any> {
  getClient: (key: string) => AsyncClient<T>;
  create: (options: O) => Promise<AsyncClient<T>>;
}
