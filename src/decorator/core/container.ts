import { Module } from '@nestjs/common';

import { ContainerModuleOptions } from '../../common';

export function ContainerRegister(option: ContainerModuleOptions) {
  return Module({
    imports: option.imports,
    providers: option.aop,
  });
}
