/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-undefined */
import { describe, it, expect } from '@jest/globals';
import { Module } from '@nestjs/common';

import { ApiRegister, DomainRegister, ContainerRegister } from '../src';

describe('decorator.core', () => it('ParamValidate', async () => expect(!!new ContainerModule()).toBe(true)));

// @ts-ignore
@DomainRegister({ service: [], manager: [], repository: [], provider: [], imports: [], exports: [], entity: [] }) class DomainModule {}
// @ts-ignore
@DomainRegister({ service: [] }) class DomainModule2 {}
// @ts-ignore
@Module({ imports: [], providers: [] }) class InfrastructureModule {}
// @ts-ignore
@ApiRegister({ imports: [DomainModule, DomainModule2], controller: [], aop: [] }) class ApiModule {}
// @ts-ignore
@ApiRegister({ controller: [] }) class ApiModule2 {}
// @ts-ignore
@ContainerRegister({ infrastructure: [InfrastructureModule], api: [ApiModule, ApiModule2], aop: [] }) class ContainerModule {}
