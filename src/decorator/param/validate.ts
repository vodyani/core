import { HttpException } from '@nestjs/common';
import { ValidatorOptions } from 'class-validator';

import { ArrayValidatedKey, BaseClass, BasePromise, RequiredKey, ValidatedKey } from '../../common';
import { isValid, toValidateClass, getReflectParamTypes, getReflectOwnMetadata, isValidObject, isValidArray } from '../../method';

export function Required(errorMessage?: string, errorCode = 422) {
  return function(target: any, property: any, index: number) {
    const data = getReflectOwnMetadata(RequiredKey, target, property);
    data.push({ index, errorCode, errorMessage });
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

export function ArrayValidated(metaClass: BaseClass, errorCode = 422) {
  return function (target: any, property: any, index: number) {
    const data = getReflectOwnMetadata(ArrayValidatedKey, target, property);
    data.push({ index, errorCode, metaClass });
    Reflect.defineMetadata(ArrayValidatedKey, data, target, property);
  };
}

export function ParamValidate(options?: ValidatorOptions) {
  return function(target: any, property: string, descriptor: TypedPropertyDescriptor<BasePromise>) {
    const method = descriptor.value;
    const types = getReflectParamTypes(target, property);
    const source = `${target.constructor.name}.${property}`;
    const requiredParams = getReflectOwnMetadata(RequiredKey, target, property);
    const validatedParams = getReflectOwnMetadata(ValidatedKey, target, property);
    const arrayValidatedParams = getReflectOwnMetadata(ArrayValidatedKey, target, property);

    descriptor.value = async function(...args: any[]) {
      for (const { index, errorCode, errorMessage } of requiredParams) {
        if (args.length < index || !isValid(args[index])) {
          throw new HttpException(errorMessage || 'missing required argument', errorCode);
        }
      }

      for (const { index, errorCode, metaClass } of arrayValidatedParams) {
        const arg = args[index];

        if (isValidArray(arg) && isValid(metaClass)) {
          for (const metadata of arg) {
            const errorMessage = await toValidateClass(metaClass, metadata, options);

            if (errorMessage) {
              throw new HttpException(errorMessage, errorCode);
            }
          }
        }
      }

      for (const { index, errorCode } of validatedParams) {
        const arg = args[index];
        const type = types[index];

        if (isValidObject(arg)) {
          const errorMessage = await toValidateClass(type, arg, options);

          if (errorMessage) {
            throw new HttpException(errorMessage, errorCode);
          }
        }
      }

      try {
        const result = await method.apply(this, args);
        return result;
      } catch (error) {
        error.message = `${error.message} from ${source}`;
        throw error;
      }
    };

    return descriptor;
  };
}
