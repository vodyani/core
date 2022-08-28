
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { applyDecorators, Post as Default, HttpCode, UseInterceptors } from '@nestjs/common';

export function Post(path: string | string[]) {
  return applyDecorators(
    Default(path),
    HttpCode(200),
  );
}

export function PostFormData(path: string | string[]) {
  return applyDecorators(
    Post(path),
    UseInterceptors(AnyFilesInterceptor({})),
  );
}
