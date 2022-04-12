import { Module } from '@nestjs/common';

import { ApiModuleOptions } from '../../common';

export function ApiRegister(options: ApiModuleOptions) {
  return Module({
    imports: options.imports,
    exports: [
      ...(options.consumer || []),
    ],
    providers: [
      ...(options.aop || []),
      ...(options.consumer || []),
    ],
    controllers: options.controller,
  });
}
