import { plainToClass } from 'class-transformer';
import { validate, ValidatorOptions } from 'class-validator';

import { BaseClass } from '../common';

import { getDefaultObject } from './convert-default';
import { isValidArray, isValidClass, isValidObject } from './validate';

export async function toValidateClass(
  metaClass: BaseClass,
  metadata: any,
  options?: ValidatorOptions,
) {
  if (isValidClass(metaClass) && isValidObject(metadata)) {
    const errors = await validate(
      plainToClass(metaClass, metadata),
      getDefaultObject(options, { forbidUnknownValues: true }),
    );

    if (isValidArray(errors)) {
      return Object.values(errors[0].constraints)[0];
    }
  }
}
