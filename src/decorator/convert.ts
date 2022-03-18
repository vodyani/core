import { BasePromise, DefaultConversionCallback } from '../common';
import { getDefault, isValid, toDeepCamelCase, toDeepSnakeCase } from '../method';

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
    return method.apply(this, toDeepCamelCase(args));
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
    return method.apply(this, toDeepSnakeCase(args));
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
    return toDeepCamelCase(result);
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
    return toDeepSnakeCase(result);
  };

  return descriptor;
}
/**
 * If an unwanted result is received when the bound function returns a value, the result is transformed to the supplied default value.
 *
 * @param replaced The optional default value, if value is empty, then the default value is returned
 * @param callback Callback function for converting default values
 *
 * @publicApi
 */
export function ResultDefaultConvert(replaced: any = null, callback?: DefaultConversionCallback) {
  return function (_target: any, _propertyName: string, descriptor: TypedPropertyDescriptor<BasePromise>) {
    const method = descriptor.value;

    descriptor.value = async function(...args: any[]) {
      const result = await method.apply(this, args);
      return isValid(callback) ? callback(result, replaced) : getDefault(result, replaced);
    };

    return descriptor;
  };
}
