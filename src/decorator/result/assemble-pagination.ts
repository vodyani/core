import { ValidationOptions } from 'class-validator';

import {
  BaseClass,
  BasePromise,
  AssembleOptions,
  PaginationResult,
} from '../../common';
import {
  isValidArray,
  isValidObject,
  toAssembleClass,
  toValidateClass,
} from '../../method';

export function PaginationResultAssemble(metadata: BaseClass, options?: AssembleOptions) {
  return function (target: any, property: string, descriptor: TypedPropertyDescriptor<BasePromise>) {
    let ignoreValidate = false;
    let validateOptions: ValidationOptions = {};

    const method = descriptor.value;
    const source = `${target.constructor.name}.${property}`;
    const defaultResult = { rows: [] as any[], page: { index: 0, size: 0, count: 0, pageCount: 0 }};

    if (isValidObject(options)) {
      ignoreValidate = options.ignoreValidate;
      validateOptions = options.validateOptions;
    }

    descriptor.value = async function(...args: any[]) {
      const result: PaginationResult = await method.apply(this, args);

      if (!isValidObject(result) || !isValidArray(result.rows)) {
        return defaultResult;
      }

      result.rows = toAssembleClass(metadata, result.rows);

      if (!ignoreValidate) {
        for (const item of result.rows) {
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
