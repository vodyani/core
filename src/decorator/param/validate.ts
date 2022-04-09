import { HttpException } from '@nestjs/common';
import { ValidatorOptions } from 'class-validator';

import { BasePromise, RequiredKey, ValidatedKey } from '../../common';
import { isValid, toValidateClass, getReflectParamTypes, getReflectOwnMetadata } from '../../method';

export function Required(errorMessage?: string, errorCode = 422) {
  return function(target: any, property: any, index: number) {
    const data = getReflectOwnMetadata(RequiredKey, target, property);
    data.push({ index, errorMessage, errorCode });
    Reflect.defineMetadata(RequiredKey, data, target, property);
  };
}

export function Validated(errorCode = 422) {
  return function (target: any, property: any, index: number) {
    const data = getReflectOwnMetadata(ValidatedKey, target, property);
    data.push({ index, errorCode });
    Reflect.defineMetadata(ValidatedKey, data, target, property);
  };
}

export function ParamValidate(options?: ValidatorOptions) {
  return function(target: any, property: string, descriptor: TypedPropertyDescriptor<BasePromise>) {
    const method = descriptor.value;
    const types = getReflectParamTypes(target, property);
    const requiredParams = getReflectOwnMetadata(RequiredKey, target, property);
    const validatedParams = getReflectOwnMetadata(ValidatedKey, target, property);

    descriptor.value = async function(...args: any[]) {
      for (const { index, errorCode, errorMessage } of requiredParams) {
        if (args.length < index || !isValid(args[index])) {
          throw new HttpException(errorMessage || 'missing required argument', errorCode);
        }
      }

      for (const { index, errorCode } of validatedParams) {
        const arg = args[index];
        const metatype = types[index];
        const errorMessage = await toValidateClass(metatype, arg, options);

        if (errorMessage) {
          throw new HttpException(errorMessage, errorCode);
        }
      }

      const result = await method.apply(this, args);
      return result;
    };

    return descriptor;
  };
}
