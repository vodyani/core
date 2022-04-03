import { Observable, map } from 'rxjs';
import { isArrayBuffer, isBuffer } from 'lodash';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import { isValidStream, toDeepSnakeCase, toDeepCamelCase } from '../method';

@Injectable()
export class ResultCamelCaseInterceptor implements NestInterceptor {
  public intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
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

@Injectable()
export class ResultSnakeCaseInterceptor implements NestInterceptor {
  public intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
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
