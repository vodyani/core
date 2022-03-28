import 'reflect-metadata';

export function getReflectParamTypes(target: any, property: string): any[] {
  return Reflect.getMetadata('design:paramtypes', target, property);
}
