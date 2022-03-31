import 'reflect-metadata';

import { getDefaultArray } from './convert-default';

export function getReflectParamTypes(target: any, property: string): any[] {
  return getDefaultArray(Reflect.getMetadata('design:paramtypes', target, property));
}

export function getReflectOwnMetadata(key: symbol, target: any, property: string): any[] {
  return getDefaultArray(Reflect.getOwnMetadata(key, target, property));
}
