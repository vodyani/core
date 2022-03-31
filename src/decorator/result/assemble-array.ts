import { ValidationOptions } from 'class-validator';

import {
  BaseClass,
  BasePromise,
  AssembleOptions,
} from '../../common';
import {
  isValidObject,
  toAssembleClass,
  toValidateClass,
  isValidArray,
} from '../../method';

export function ArrayResultAssemble(metadata: BaseClass, options?: AssembleOptions) {
  return function (target: any, property: string, descriptor: TypedPropertyDescriptor<BasePromise>) {
    let ignoreValidate = false;
    let validateOptions: ValidationOptions = {};

    const method = descriptor.value;
    const source = `${target.constructor.name}.${property}`;

    if (isValidObject(options)) {
      ignoreValidate = options.ignoreValidate;
      validateOptions = options.validateOptions;
    }

    descriptor.value = async function(...args: any[]) {
      let result = await method.apply(this, args);

      if (!isValidArray(result)) {
        return [];
      }

      result = toAssembleClass(metadata, result);

      if (!ignoreValidate) {
        for (const item of result) {
          const errorMessage = await toValidateClass(metadata, item, validateOptions);

          if (errorMessage) {
            throw new Error(`${source} validation error: ${errorMessage}`);
          }
        }
      }

      return result;
    };

    return descriptor;
  };
}
