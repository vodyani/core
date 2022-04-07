import { ClientAdapter, AsyncClientAdapter } from '../interface';

import { BaseObject } from './base';

export type SubscribeCallback<T = any> = (config: BaseObject<T>) => any;
export type CreateClientAdapter<T = any, O = any> = (options: O, ...args: any[]) => ClientAdapter<T>;
export type CreateAsyncClientAdapter<T = any, O = any> = (options: O, ...args: any[]) => Promise<AsyncClientAdapter<T>>;
