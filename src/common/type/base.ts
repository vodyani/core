import { Type, DynamicModule, ForwardReference, Abstract } from '@nestjs/common';

export type BaseClass<T = any> = Type<T>;

export type BaseFunction = (...args: any[]) => any;

export type BasePromise = (...args: any[]) => Promise<any>;

export type BaseProvide = string | symbol | Type<any> | Abstract<any> | Function;

export type BaseModule = Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference;
