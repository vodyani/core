import { Module } from '@nestjs/common';

import { InfrastructureModuleOptions } from '../../common';

export function InfrastructureRegister(options: InfrastructureModuleOptions) {
  return Module({
    imports: options.imports,
    exports: options.provider,
    providers: options.provider,
  });
}
