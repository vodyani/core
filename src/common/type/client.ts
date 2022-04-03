import { ClientAdapter, AsyncClientAdapter } from '../abstract';

export type CreateClientAdapter<T, O> = (options: O, ...args: any[]) => ClientAdapter<T>;
export type CreateAsyncClientAdapter<T, O> = (options: O, ...args: any[]) => Promise<AsyncClientAdapter<T>>;
