import 'reflect-metadata';

export function getReflectParamTypes(target: any, property: string): any[] {
  return Reflect.getMetadata('design:paramtypes', target, property);
}

export function getReflectOwnMetadata(key: symbol, target: any, property: string): any[] {
  return Reflect.getOwnMetadata(key, target, property) || [];
}
