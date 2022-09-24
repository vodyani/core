import { beforeEach, describe, expect, it } from '@jest/globals';
import { Injectable, Module, Controller } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import {
  AsyncInject,
  AsyncInjectable,
  AsyncProvider,
  AsyncProviderFactory,
  Post,
} from '../src';

@AsyncInjectable
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
class NameInfrastructureProvider {
  public get() {
    return 'InfrastructureProvider';
  }
}

@Module({
  exports: [NameInfrastructureProvider],
  providers: [NameInfrastructureProvider],
})
class NameInfrastructure {}

@Injectable()
class NameProvider {
  constructor(
    private readonly name: NameInfrastructureProvider,
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
class NameService {
  constructor(private readonly name: NameProvider) {}

  public get() {
    return {
      name: this.name.get(),
      asyncName: this.name.getAsyncName(),
    };
  }
}

@Module({
  imports: [NameInfrastructure],
  exports: [NameService],
  providers: [NameService, NameProvider, new AsyncNameProvider().create()],
})
class NameDomain {}


@Controller('name')
class NameController {
  constructor(private readonly name: NameService) {}

  @Post()
  result() {
    return { data: this.name.get() };
  }
}

@Module({
  imports: [NameDomain],
  controllers: [NameController],
})
class NameApi {}

@Module({ imports: [NameApi] })
class AppModule {}

let app: any;

beforeEach(async () => {
  const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
  app = moduleRef.createNestApplication();
  await app.init();
});

describe('decorator', () => {
  it('test', async () => {
    const data = await request(app.getHttpServer()).post('/name');

    expect(data.statusCode).toBe(200);
    expect(data.body.data.name).toBe('InfrastructureProvider');
    expect(data.body.data.asyncName).toBe('InfrastructureProvider');

    await app.close();
  });
});
