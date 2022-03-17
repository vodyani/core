import { BasePromise, IClassValidationOptions } from '../common';
import { classValidation, getReflectParamTypes } from '../method';

/**
 * Validation of parameters in class methods When the method is invoked, decorators will trigger 'classValidation' data validation,
 *
 * and will throw an exception if the parameter contains a class wrapped by a 'class-validator' decorator.
 *
 * @param mode Exception check mode, The following values can be selected: `Error` or `HttpException`
 *
 * @publicApi
 */
export function ParamValidate(options?: IClassValidationOptions) {
  return function(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<BasePromise>) {
    const method = descriptor.value;
    const types = getReflectParamTypes(target, propertyName);
    const currentMode = options && options.exceptionMode ? options.exceptionMode : 'HttpException';

    descriptor.value = async function(...args: any[]) {
      for (let i = 0; i < args.length; i++) {
        const data = args[i];
        const metatype = types[i];
        await classValidation(
          metatype,
          data,
          { exceptionMode: currentMode, validatorOptions: options?.validatorOptions },
        );
      }

      const result = await method.apply(this, args);
      return result;
    };

    return descriptor;
  };
}
