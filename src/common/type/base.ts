import { Type } from '@nestjs/common';

export type BaseClass<T = any> = Type<T>;
export type BaseObject<T = any> = { [P in keyof T]: T[P]; };
export type BaseFunction<T = any> = (...args: any[]) => T;
export type BasePromise<T = any> = (...args: any[]) => Promise<T>;
