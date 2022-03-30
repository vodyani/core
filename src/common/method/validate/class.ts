import { validate, ValidatorOptions } from 'class-validator';
import { plainToClass } from 'class-transformer';

import { BaseClass } from '../../type';
import { getDefaultObject } from '../convert';

import { isValidArray, isValidClass, isValidObject } from './base';

/**
 * Verify property values one by one according to the definition of `class-validator` in the class
 *
 * @param metaClass Validated Classes
 * @param metaObject Validated objects
 * @param options Options passed to validator during validation and exception check mode, The following values can be selected: `Error` or `HttpException`
 *
 * @returns void
 *
 * @publicApi
 */
export async function classValidation(
  metaClass: BaseClass,
  metaObject: any,
  options?: ValidatorOptions,
) {
  if (isValidClass(metaClass) && isValidObject(metaObject)) {
    const errors = await validate(
      plainToClass(metaClass, metaObject),
      getDefaultObject(options, { forbidUnknownValues: true }),
    );

    if (isValidArray(errors)) {
      const message = Object.values(errors[0].constraints)[0];
      throw new Error(`${metaClass} Validation Fail: ${message}`);
    }
  }
}
