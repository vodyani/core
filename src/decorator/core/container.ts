import { Module } from '@nestjs/common';

import { ContainerModuleOptions } from '../../common';

export function ContainerModule(options: ContainerModuleOptions) {
  return Module({
    providers: options.aop,
    imports: [...options.api, ...options.infrastructure],
  });
}
