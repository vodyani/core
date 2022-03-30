import { ClientAdapter, AsyncClientAdapter } from '../interface';

export type CreateClientAdapter<T, O> = (options: O, ...args: any[]) => ClientAdapter<T>;
export type AsyncCreateClientAdapter<T, O> = (options: O, ...args: any[]) => Promise<AsyncClientAdapter<T>>;
