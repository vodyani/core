import { ValidatorOptions } from 'class-validator';

import { ExceptionMode } from '../type';

/**
 * Class parameter validation options.
 */
export interface ClassValidationOptions {
  /**
   * Exception check mode.
   *
   * The following values can be selected: `Error` or `HttpException`
   */
  exceptionMode?: ExceptionMode;
  /**
   * Options passed to validator during validation.
   */
  validatorOptions?: ValidatorOptions;
}
