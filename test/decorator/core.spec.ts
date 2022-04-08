/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-undefined */
import { describe, it, expect } from '@jest/globals';

import {
  ApiRegister,
  DomainRegister,
  ContainerRegister,
  InfrastructureRegister,
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

@InfrastructureRegister({
  imports: [],
  provider: [],
})
// @ts-ignore
class InfrastructureModule {}

@ContainerRegister({
  imports: [
    ApiModule,
    ApiModule2,
    DomainModule,
    DomainModule2,
    InfrastructureModule,
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
