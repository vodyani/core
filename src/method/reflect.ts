import 'reflect-metadata';

export function getReflectParamTypes(target: any, propertyName: string): any[] {
  return Reflect.getMetadata('design:paramtypes', target, propertyName);
}
