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
} from '../../method';

export function ResultAssemble(metadata: BaseClass, options?: AssembleOptions) {
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

      if (!isValidObject(result)) {
        return null;
      }

      result = toAssembleClass(metadata, result);

      if (!ignoreValidate) {
        const errorMessage = await toValidateClass(metadata, result, validateOptions);

        if (errorMessage) {
          throw new Error(`${source} validation error: ${errorMessage}`);
        }
      }

      return result;
    };

    return descriptor;
  };
}
