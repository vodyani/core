import { Module } from '@nestjs/common';

import { ApiModuleOptions } from '../../common';

export function ApiModule(options: ApiModuleOptions) {
  return Module({
    imports: options.imports || [],
    controllers: options.controller || [],
    providers: [...(options.aop || []), ...(options.consumer || [])],
  });
}
