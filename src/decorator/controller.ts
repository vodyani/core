
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { applyDecorators, Post as DefaultPost, HttpCode, UseInterceptors } from '@nestjs/common';

/**
 * Route handler (method) Decorator. Routes HTTP POST requests to the specified path.
 *
 * @see [Routing](https://docs.nestjs.com/controllers#routing)
 *
 * @publicApi
 */
export function Post(path: string | string[]) {
  return applyDecorators(
    DefaultPost(path),
    HttpCode(200),
  );
}
/**
 * Route handler (method) Decorator. Routes HTTP POST FormData requests to the specified path.
 *
 * @see [Routing](https://docs.nestjs.com/controllers#routing)
 *
 * @publicApi
 */
export function PostFormData(path: string | string[]) {
  return applyDecorators(
    Post(path),
    UseInterceptors(AnyFilesInterceptor({})),
  );
}
