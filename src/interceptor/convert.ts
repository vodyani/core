import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request, Response } from 'express';
import { isArrayBuffer, isBuffer } from 'lodash';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import { HTTP_HEADER, httpStatusMap, IResponseBody } from '../common';
import { getDefault, getDefaultString, isValidStream, toDeepCamelCase, toDeepSnakeCase } from '../method';

/**
 * When the control layer returns the results, perform a `CamelCase` conversion of the object properties.
 *
 * @publicApi
 */
@Injectable()
export class ResultCamelCaseInterceptor implements NestInterceptor {
  public intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((body: IResponseBody<any>) => {
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
      map((body: IResponseBody<any>) => {
        if (isValidStream(body) || isBuffer(body) || isArrayBuffer(body)) {
          return body;
        }

        return toDeepSnakeCase(body);
      }),
    );
  }
}
/**
 * When the control layer returns the results, they are formatted.
 *
 * @todo Compatible with buffer and duplex streams
 *
 * @publicApi
 */
@Injectable()
export class ResultFormatInterceptor implements NestInterceptor {
  public intercept(ctx: ExecutionContext, next: CallHandler): Observable<IResponseBody<any>> {
    const requestTime = Date.now();

    return next.handle().pipe(
      map((body: IResponseBody<any>) => {
        if (isValidStream(body) || isBuffer(body) || isArrayBuffer(body)) {
          return body;
        }

        const request: Request = ctx.switchToHttp().getRequest();
        const response: Response = ctx.switchToHttp().getResponse();
        const requestId = request.headers[HTTP_HEADER.RID] as string;

        const httpStatus = httpStatusMap.get(response.statusCode);

        const code = httpStatus.code;
        const responseTime = Date.now();
        const data = getDefault(body, {});
        const message = getDefaultString(httpStatus.message);
        return { code, message, requestId, requestTime, responseTime, data };
      }),
    );
  }
}
