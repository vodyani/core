import { ClientAdapter, AsyncClientAdapter } from '../interface';

import { ObjectType } from './base';

export type SubscribeCallback<T = any> = (config: ObjectType<T>) => any;
export type CreateClientAdapter<T = any, O = any> = (options: O, ...args: any[]) => ClientAdapter<T>;
export type CreateAsyncClientAdapter<T = any, O = any> = (options: O, ...args: any[]) => Promise<AsyncClientAdapter<T>>;
