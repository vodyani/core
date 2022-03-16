import { ExceptionMode } from '../type';

/**
 * The metadata assembly option is typically used to assemble the defined VO and DO.
 *
 * Return the relevant data via various invocation methods.
 */
export interface IMetadataAssembleOptions {
  /**
   * Whether or not metadata validation should be ignored.
   *
   * The `classValidation` method is not invoked when the value is `true`.
   */
  ignoreValidate?: boolean;
  /**
   * Exception check mode.
   *
   * The following values can be selected: `Error` or `HttpException`
   */
  exceptionMode?: ExceptionMode;
}
