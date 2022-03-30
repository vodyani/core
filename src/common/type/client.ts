import { Client, AsyncClient } from '../interface';

export type CreateClientCallback<CLIENT, OPTION> = (options: OPTION, ...args: any[]) => Client<CLIENT>;
export type AsyncCreateClientCallback<CLIENT, OPTION> = (options: OPTION, ...args: any[]) => Promise<AsyncClient<CLIENT>>;
