import { Type } from '@nestjs/common';

export type Class<T = any> = Type<T>;
export type ObjectType<T = any> = { [P in keyof T]: T[P]; };
export type FunctionType<T = any> = (...args: any[]) => T;
export type PromiseType<T = any> = (...args: any[]) => Promise<T>;
