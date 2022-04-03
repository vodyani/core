import { ClientAdapter, AsyncClientAdapter } from '../abstract';

export type CreateClientAdapter<O = any, T = any, A = ClientAdapter<T>> = (options: O, ...args: any[]) => A;
export type CreateAsyncClientAdapter<O = any, T = any, A = AsyncClientAdapter<T>> = (options: O, ...args: any[]) => Promise<A>;
