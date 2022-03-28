import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

import { BaseClass, errorRuleEngine, ClassValidationOptions } from '../../common';

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
  options?: ClassValidationOptions,
) {
  const currentMode = options && options.exceptionMode
    ? options.exceptionMode
    : 'Error';

  const validatorOptions = options && options.validatorOptions
    ? options.validatorOptions
    : { forbidUnknownValues: true };

  if (isValidClass(metaClass) && isValidObject(metaObject)) {
    const errors = await validate(
      plainToClass(metaClass, metaObject),
      validatorOptions,
    );

    if (isValidArray(errors)) {
      errorRuleEngine[currentMode](Object.values(errors[0].constraints)[0]);
    }
  }
}
