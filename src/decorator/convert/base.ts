import { BasePromise, isValid, getDefault } from '../../common';

/**
 * If an unwanted result is received when the bound function returns a value, the result is transformed to the supplied default value.
 *
 * @param replaced The optional default value, if value is empty, then the default value is returned
 * @param callback Callback function for converting default values
 *
 * @publicApi
 */
export function DefaultResult(replaced: any = null, callback?: (value: any, replaced: any) => any) {
  return function (_target: any, _property: string, descriptor: TypedPropertyDescriptor<BasePromise>) {
    const method = descriptor.value;

    descriptor.value = async function(...args: any[]) {
      const result = await method.apply(this, args);
      return isValid(callback) ? callback(result, replaced) : getDefault(result, replaced);
    };

    return descriptor;
  };
}
