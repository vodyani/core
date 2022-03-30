import { ValidatorOptions } from 'class-validator';

import { BasePromise, classValidation, getReflectParamTypes } from '../common';

/**
 * Validation of parameters in class methods When the method is invoked, decorators will trigger 'classValidation' data validation,
 *
 * and will throw an exception if the parameter contains a class wrapped by a 'class-validator' decorator.
 *
 * @param options Options passed to validator during validation and exception check mode, The following values can be selected: `Error` or `HttpException`
 *
 * @publicApi
 */
export function ParamValidate(options?: ValidatorOptions) {
  return function(target: any, property: string, descriptor: TypedPropertyDescriptor<BasePromise>) {
    const method = descriptor.value;
    const types = getReflectParamTypes(target, property);

    descriptor.value = async function(...args: any[]) {
      for (let i = 0; i < args.length; i++) {
        const data = args[i];
        const metatype = types[i];
        await classValidation(metatype, data, options);
      }

      const result = await method.apply(this, args);
      return result;
    };

    return descriptor;
  };
}
