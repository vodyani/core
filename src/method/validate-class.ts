import { plainToClass } from 'class-transformer';
import { validate, ValidatorOptions } from 'class-validator';

import { BaseClass } from '../common';

import { getDefaultObject } from './convert-default';
import { isValid, isValidArray, isValidObject } from './validate';

export async function toValidateClass(
  metaClass: BaseClass,
  metadata: any,
  options?: ValidatorOptions,
) {
  let errorMessage: any = null;

  if (isValid(metaClass) && isValidObject(metadata)) {
    const errors = await validate(
      plainToClass(metaClass, metadata),
      getDefaultObject(options),
    );

    if (isValidArray(errors)) {
      const stack = [];

      stack.push(errors);

      while (stack.length > 0) {
        const node = stack.pop();

        for (const error of node) {
          if (isValidObject(error.constraints)) {
            errorMessage = Object.values(error.constraints)[0];
          } else {
            stack.push(error.children);
          }
        }
      }

      return errorMessage;
    }
  }

  return errorMessage;
}
