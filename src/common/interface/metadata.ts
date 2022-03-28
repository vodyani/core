import { ClassValidationOptions } from './validate';

/**
 * The metadata assembly option is typically used to assemble the defined VO and DO.
 *
 * Return the relevant data via various invocation methods.
 */
export interface MetadataAssembleOptions extends ClassValidationOptions {
  /**
   * Whether or not metadata validation should be ignored.
   *
   * The `classValidation` method is not invoked when the value is `true`.
   */
  ignoreValidate?: boolean;
}
