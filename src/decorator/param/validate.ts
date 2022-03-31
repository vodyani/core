import { ValidatorOptions } from 'class-validator';

import { BasePromise, RequiredKey } from '../../common';
import { isValid, toValidateClass, getReflectParamTypes, getReflectOwnMetadata } from '../../method';

export function ParamValidate(options?: ValidatorOptions) {
  return function(target: any, property: string, descriptor: TypedPropertyDescriptor<BasePromise>) {
    const method = descriptor.value;
    const types = getReflectParamTypes(target, property);
    const source = `${target.constructor.name}.${property}`;
    const requiredParams = getReflectOwnMetadata(RequiredKey, target, property);

    descriptor.value = async function(...args: any[]) {
      for (const index of requiredParams) {
        if (args.length < index || !isValid(args[index])) {
          throw new Error(`${source} validation error: missing required argument at index [${index}]`);
        }
      }

      for (let index = 0; index < args.length; index++) {
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
