/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { Controller, Get, Injectable } from '@nestjs/common';
import { describe, it, expect, beforeEach } from '@jest/globals';

import {
  ApiRegister,
  ContainerRegister,
  DomainRegister,
  InfrastructureRegister,
} from '../src';

@Injectable()
// @ts-ignore
class NameInfrastructureProvider { public get() { return 'InfrastructureProvider' }}

@InfrastructureRegister({ exports: [NameInfrastructureProvider], provider: [NameInfrastructureProvider] })
// @ts-ignore
class NameInfrastructure {}

@Injectable()
// @ts-ignore
class NameProvider {
  constructor(private readonly name: NameInfrastructureProvider) {}

  public get() {
    return this.name.get();
  }
}

@Injectable()
// @ts-ignore
class NameService {
  constructor(private readonly name: NameProvider) {}

  public get() {
    return this.name.get();
  }
}

@DomainRegister({ imports: [NameInfrastructure], service: [NameService], provider: [NameProvider] })
// @ts-ignore
class NameDomain {}


@Controller('name')
// @ts-ignore
class NameController {
  constructor(private readonly name: NameService) {}

  @Get()
  // @ts-ignore
  get() {
    return { name: this.name.get() };
  }
}

@ApiRegister({ imports: [NameDomain], controller: [NameController] })
// @ts-ignore
class NameApi {}

@ContainerRegister({ api: [NameApi] })
// @ts-ignore
class AppModule {}

let app: any;

beforeEach(async () => {
  const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
  app = moduleRef.createNestApplication();
  await app.init();
});

describe('decorator', () => {
  it('test', async () => {
    const data = await request(app.getHttpServer()).get('/name');

    expect(data.statusCode).toBe(200);
    expect(data.body.name).toBe('InfrastructureProvider');

    await app.close();
  });
});
