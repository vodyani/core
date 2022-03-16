/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-undefined */
import { describe, it, expect } from '@jest/globals';

import {
  ApiRegister,
  ContainerRegister,
  DomainRegister,
  InfrastructureRegister,
} from '../../src/decorator/base';

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
