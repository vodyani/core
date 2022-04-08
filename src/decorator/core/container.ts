import { Module } from '@nestjs/common';

import { ContainerModuleOptions } from '../../common';

export function ContainerRegister(options: ContainerModuleOptions) {
  return Module({
    imports: options.imports,
    providers: options.aop,
  });
}
