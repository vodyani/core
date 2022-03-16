import { classValidation } from '../method/validate';
import { getReflectParamTypes } from '../method/reflect';
import { BasePromise, ExceptionMode } from '../common/type';

/**
 * Validation of parameters in class methods When the method is invoked, decorators will trigger 'classValidation' data validation,
 *
 * and will throw an exception if the parameter contains a class wrapped by a 'class-validator' decorator.
 *
 * @param mode Exception check mode, The following values can be selected: `Error` or `HttpException`
 *
 * @publicApi
 */
export function ParamValidate(mode: ExceptionMode = 'HttpException') {
  return function(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<BasePromise>) {
    const method = descriptor.value;
    const types = getReflectParamTypes(target, propertyName);

    descriptor.value = async function(...args: any[]) {
      for (let i = 0; i < args.length; i++) {
        const data = args[i];
        const metatype = types[i];
        await classValidation(metatype, data, mode);
      }

      const result = await method.apply(this, args);
      return result;
    };

    return descriptor;
  };
}
