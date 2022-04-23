/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-undefined */
import { Module } from '@nestjs/common';
import { describe, it, expect } from '@jest/globals';

import { ApiModule, DomainModule, ContainerModule } from '../src';

// @ts-ignore
@DomainModule({ service: [], manager: [], repository: [], provider: [], imports: [], exports: [], entity: [] }) class DomainModule1 {}
// @ts-ignore
@DomainModule({}) class DomainModule2 {}
// @ts-ignore
@Module({ imports: [], providers: [] }) class InfrastructureModule {}
// @ts-ignore
@ApiModule({ imports: [DomainModule1, DomainModule2], controller: [], aop: [] }) class ApiModule1 {}
// @ts-ignore
@ApiModule({}) class ApiModule2 {}
// @ts-ignore
@ContainerModule({ infrastructure: [InfrastructureModule], api: [ApiModule1, ApiModule2], aop: [] }) class ContainerModule1 {}

describe('decorator.core', () => it('ParamValidate', async () => expect(!!new ContainerModule1()).toBe(true)));
