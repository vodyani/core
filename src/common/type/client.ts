import { ClientAdapter, AsyncClientAdapter } from '../abstract';

export type CreateClientAdapter<T = any, O = any> = (options: O, ...args: any[]) => ClientAdapter<T>;
export type CreateAsyncClientAdapter<T = any, O = any> = (options: O, ...args: any[]) => Promise<AsyncClientAdapter<T>>;
