import { Module } from '@nestjs/common';

import { ContainerModuleOptions } from '../../common';

export function ContainerRegister(options: ContainerModuleOptions) {
  return Module({
    imports: [
      ...options.api,
      ...options.infrastructure,
    ],
    providers: options.aop,
  });
}
