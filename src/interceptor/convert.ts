import { Observable, map } from 'rxjs';
import { isArrayBuffer, isBuffer } from 'lodash';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import { isValidStream, toDeepCamelCase, toDeepSnakeCase } from '../common';

/**
 * When the control layer returns the results, perform a `CamelCase` conversion of the object properties.
 *
 * @publicApi
 */
@Injectable()
export class ResultCamelCaseInterceptor implements NestInterceptor {
  public intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((body: any) => {
        if (isValidStream(body) || isBuffer(body) || isArrayBuffer(body)) {
          return body;
        }

        return toDeepCamelCase(body);
      }),
    );
  }
}
/**
 * When the control layer returns the results, perform a `SnakeCase` conversion of the object properties.
 *
 * @publicApi
 */
@Injectable()
export class ResultSnakeCaseInterceptor implements NestInterceptor {
  public intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((body: any) => {
        if (isValidStream(body) || isBuffer(body) || isArrayBuffer(body)) {
          return body;
        }

        return toDeepSnakeCase(body);
      }),
    );
  }
}
