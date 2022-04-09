/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-undefined */
import { describe, it, expect } from '@jest/globals';
import { Module } from '@nestjs/common';

import {
  ApiRegister,
  DomainRegister,
  ContainerRegister,
} from '../../src';

@ApiRegister({
  imports: [],
  controller: [],
  aop: [],
})
// @ts-ignore
class ApiModule {}

@ApiRegister({
  controller: [],
})
// @ts-ignore
class ApiModule2 {}

@DomainRegister({
  service: [],
  manager: [],
  repository: [],
  provider: [],
  imports: [],
  exports: [],
  entity: [],
})
// @ts-ignore
class DomainModule {}

@DomainRegister({
  service: [],
})
// @ts-ignore
class DomainModule2 {}

@Module({
  imports: [],
  providers: [],
})
// @ts-ignore
class InfrastructureModule {}

@ContainerRegister({
  infrastructure: [
    InfrastructureModule,
  ],
  domain: [
    DomainModule,
    DomainModule2],
  api: [
    ApiModule,
    ApiModule2,
  ],
  aop: [],
})
// @ts-ignore
class ContainerModule {}

describe('decorator.base', () => {
  it('ParamValidate', async () => {
    expect(!!new ContainerModule()).toBe(true);
  });
});
