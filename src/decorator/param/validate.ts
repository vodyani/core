import { ValidatorOptions } from 'class-validator';

import { BasePromise, RequiredKey, ValidatedKey } from '../../common';
import { isValid, toValidateClass, getReflectParamTypes, getReflectOwnMetadata } from '../../method';

export function Required(target: any, property: any, propertyIndex: number) {
  const data = getReflectOwnMetadata(RequiredKey, target, property);
  data.push(propertyIndex);
  Reflect.defineMetadata(RequiredKey, data, target, property);
}

export function Validated(target: any, property: any, propertyIndex: number) {
  const data = getReflectOwnMetadata(ValidatedKey, target, property);
  data.push(propertyIndex);
  Reflect.defineMetadata(ValidatedKey, data, target, property);
}

export function ParamValidate(options?: ValidatorOptions) {
  return function(target: any, property: string, descriptor: TypedPropertyDescriptor<BasePromise>) {
    const method = descriptor.value;
    const source = `${target.constructor.name}.${property}`;
    const types = getReflectParamTypes(target, property);
    const requiredParams = getReflectOwnMetadata(RequiredKey, target, property);
    const validatedParams = getReflectOwnMetadata(ValidatedKey, target, property);

    if (validatedParams.length > 0) {
      validatedParams.forEach(index => {
        if (!requiredParams.includes(index)) {
          requiredParams.push(index);
        }
      });
    }

    descriptor.value = async function(...args: any[]) {
      for (const index of requiredParams) {
        if (args.length < index || !isValid(args[index])) {
          throw new Error(`${source} validation error: missing required argument at index [${index}]`);
        }
      }

      for (const index of validatedParams) {
        const data = args[index];
        const metatype = types[index];
        const errorMessage = await toValidateClass(metatype, data, options);

        if (errorMessage) {
          throw new Error(`${source} validation error: ${errorMessage}`);
        }
      }

      const result = await method.apply(this, args);
      return result;
    };

    return descriptor;
  };
}
