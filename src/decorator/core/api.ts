import { Module } from '@nestjs/common';

import { ApiModuleOptions } from '../../common';

export function ApiRegister(option: ApiModuleOptions) {
  return Module({
    imports: option.imports,
    providers: [
      ...(option.aop || []),
      ...(option.consumer || []),
    ],
    controllers: option.controller,
  });
}
