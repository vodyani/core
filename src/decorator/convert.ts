import { BasePromise } from '../common';
import { toCamelCase, toSnakeCase } from '../method/convert';

/**
 * When the function is called, the parameters of the function are extracted and the properties of the objects in the parameters are converted to the `CamelCase` nomenclature.
 *
 * @usageNotes
 * - `Recursive support`.
 *
 * @publicApi
 */
export function ParamCameCase(_target: any, _propertyName: string, descriptor: TypedPropertyDescriptor<any>) {
  const method = descriptor.value;

  descriptor.value = function(...args: any[]) {
    return method.apply(this, toCamelCase(args));
  };

  return descriptor;
}
/**
 * When the function is called, the parameters of the function are extracted and the properties of the objects in the parameters are converted to the `SnakeCase` nomenclature.
 *
 * @usageNotes
 * - `Recursive support`.
 *
 * @publicApi
 */
export function ParamSnakeCase(_target: any, _propertyName: string, descriptor: TypedPropertyDescriptor<any>) {
  const method = descriptor.value;

  descriptor.value = function(...args: any[]) {
    return method.apply(this, toSnakeCase(args));
  };

  return descriptor;
}
/**
 * When the function is called, the return value of the function is extracted and the properties of the object in the return value are converted to the `CamelCase` nomenclature.
 *
 * @usageNotes
 * - `Recursive support`.
 * - This decorator can only be applied to the class's asynchronous functions.
 *
 * @publicApi
 */
export function ResultCameCase(_target: any, _propertyName: string, descriptor: TypedPropertyDescriptor<BasePromise>) {
  const method = descriptor.value;

  descriptor.value = async function(...args: any[]) {
    const result = await method.apply(this, args);
    return toCamelCase(result);
  };

  return descriptor;
}
/**
 * When the function is called, the return value of the function is extracted and the properties of the object in the return value are converted to the `SnakeCase` nomenclature.
 *
 * @usageNotes
 * - `Recursive support`.
 * - This decorator can only be applied to the class's asynchronous functions.
 *
 * @publicApi
 */
export function ResultSnakeCase(_target: any, _propertyName: string, descriptor: TypedPropertyDescriptor<BasePromise>) {
  const method = descriptor.value;

  descriptor.value = async function(...args: any[]) {
    const result = await method.apply(this, args);
    return toSnakeCase(result);
  };

  return descriptor;
}
