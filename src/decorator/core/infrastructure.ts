import { Module } from '@nestjs/common';

import { InfrastructureModuleOptions } from '../../common';

export function InfrastructureRegister(option: InfrastructureModuleOptions) {
  return Module({
    imports: option.imports,
    exports: option.imports,
  });
}
