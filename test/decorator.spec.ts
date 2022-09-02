/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { describe, it, expect, beforeEach } from '@jest/globals';
import { Controller, FactoryProvider, Get, Injectable } from '@nestjs/common';

import {
  Api,
  Container,
  Domain,
  Infrastructure,
  AsyncInject,
  AsyncInjectable,
  AsyncProvider,
  AsyncProviderFactory,
} from '../src';

@AsyncInjectable
// @ts-ignore
class AsyncNameProvider extends AsyncProvider implements AsyncProviderFactory {
  public create = () => ({
    inject: [NameInfrastructureProvider],
    provide: AsyncNameProvider.getToken(),
    useFactory: (provider: NameInfrastructureProvider) => {
      return provider;
    },
  });
}

@Injectable()
// @ts-ignore
class NameInfrastructureProvider {
  public get() { return 'InfrastructureProvider' }
}

@Infrastructure({ export: [NameInfrastructureProvider], provider: [NameInfrastructureProvider] })
// @ts-ignore
class NameInfrastructure {}

@Injectable()
// @ts-ignore
class NameProvider {
  constructor(
    private readonly name: NameInfrastructureProvider,
    // @ts-ignore
    @AsyncInject(AsyncNameProvider) private readonly asyncName: any,
  ) {}

  public get() {
    return this.name.get();
  }

  public getAsyncName() {
    return this.asyncName.get();
  }
}

@Injectable()
// @ts-ignore
class NameService {
  constructor(private readonly name: NameProvider) {}

  public get() {
    return {
      name: this.name.get(),
      asyncName: this.name.getAsyncName(),
    };
  }
}

@Domain({ service: [NameService], import: [NameInfrastructure], provider: [NameProvider, new AsyncNameProvider().create()] })
// @ts-ignore
class NameDomain {}


@Controller('name')
// @ts-ignore
class NameController {
  constructor(private readonly name: NameService) {}

  @Get()
  // @ts-ignore
  get() {
    return { data: this.name.get() };
  }
}

@Api({ import: [NameDomain], controller: [NameController] })
// @ts-ignore
class NameApi {}

@Container({ api: [NameApi] })
// @ts-ignore
class AppModule {}


@Container({})
@Api({ controller: [] })
@Domain({ service: [] })
@Infrastructure({ provider: [] })
// @ts-ignore
class Demo {}

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
    expect(data.body.data.name).toBe('InfrastructureProvider');
    expect(data.body.data.asyncName).toBe('InfrastructureProvider');

    await app.close();
  });
});
