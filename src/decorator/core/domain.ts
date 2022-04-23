import { Module } from '@nestjs/common';

import { DomainModuleOptions } from '../../common';

export function DomainModule(options: DomainModuleOptions) {
  return Module({
    imports: options.imports || [],
    exports: options.exports || [],
    providers: [
      ...(options.service || []),
      ...(options.manager || []),
      ...(options.repository || []),
      ...(options.provider || []),
      ...(options.entity || []),
    ],
  });
}
