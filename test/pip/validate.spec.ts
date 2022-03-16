/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as request from 'supertest';
import { APP_PIPE } from '@nestjs/core';
import { IsNotEmpty } from 'class-validator';
import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach } from '@jest/globals';
import { Controller, Get, Injectable, Query } from '@nestjs/common';

import { DTOValidatePipe } from '../../src/pipe/validate';
import { DTOCamelCasePipe } from '../../src/pipe/convert';

class DTO {
  @IsNotEmpty()
  // @ts-ignore
  userName: string;
}

@Injectable()
// @ts-ignore
class Service {
  get(dto: DTO) {
    return dto;
  }
}

@Controller('/')
// @ts-ignore
class ControllerTest {
  constructor(private readonly service: Service) {}

  @Get('test')
  // @ts-ignore
  get(@Query() dto: DTO) {
    return this.service.get(dto);
  }
}

let app: any = null;
let app2: any = null;

beforeEach(async () => {
  process.env['NODE_ENV'] = '' as any;

  const moduleRef: TestingModule = await Test.createTestingModule({
    providers: [
      Service,
      { provide: APP_PIPE, useClass: DTOCamelCasePipe },
      { provide: APP_PIPE, useClass: DTOValidatePipe },
    ],
    controllers: [ControllerTest],
  }).compile();

  const moduleRef2: TestingModule = await Test.createTestingModule({
    providers: [
      Service,
      { provide: APP_PIPE, useClass: DTOValidatePipe },
    ],
    controllers: [ControllerTest],
  }).compile();

  app = moduleRef.createNestApplication();
  await app.init();

  app2 = moduleRef2.createNestApplication();
  await app2.init();
});

describe('pipe', () => {
  it('convert and validate', async () => {
    const result = await request(app.getHttpServer()).get('/test?user_name=test');
    expect(result.body.userName).toBe('test');
    await app.close();
  });

  it('only validate', async () => {
    const result = await request(app2.getHttpServer()).get('/test?userName=test');
    expect(result.body.userName).toBe('test');
    await app2.close();
  });
});
