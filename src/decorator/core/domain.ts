import { Module } from '@nestjs/common';

import { DomainModuleOptions } from '../../common';

export function DomainRegister(option: DomainModuleOptions) {
  return Module({
    exports: option.service,
    imports: option.imports,
    providers: [
      ...(option.service || []),
      ...(option.manager || []),
      ...(option.repository || []),
      ...(option.provider || []),
      ...(option.entity || []),
    ],
  });
}
