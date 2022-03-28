import { HttpException } from '@nestjs/common';

import { HTTP_STATUS } from '../enum';

/**
 * The rule engine that throws exceptions.
 */
export const errorRuleEngine = {
  /**
   * Javascript Basic Exception Class
   *
   * @publicApi
   */
  Error: (error: any) => {
    throw new Error(error);
  },
  /**
   * Defines the base Nest HTTP exception, which is handled by the default
   * Exceptions Handler.
   *
   * @see [Base Exceptions](https://docs.nestjs.com/exception-filters#base-exceptions)
   *
   * @publicApi
   */
  HttpException: (error: any) => {
    throw new HttpException(error, HTTP_STATUS.UNPROCURABLE);
  },
};
