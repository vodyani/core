/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as request from 'supertest';
import { APP_PIPE } from '@nestjs/core';
import { IsNotEmpty, IsString } from 'class-validator';
import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach } from '@jest/globals';
import { Body, Controller, Get, Injectable, Post, Query } from '@nestjs/common';

import { DtoValidatePipe, DtoCamelCasePipe, ParamValidate, Required, isValidObject } from '../../src';

class DTO {
  @IsNotEmpty()
  @IsString()
  // @ts-ignore
  public userName: string;
}

@Injectable()
// @ts-ignore
class Service {
  @ParamValidate()
  // @ts-ignore
  async get(@Required('xxx', 777) dto: DTO) {
    return dto;
  }

  @ParamValidate()
  // @ts-ignore
  async getId(@Required() dto: DTO) {
    return dto;
  }
}

@Controller('/')
// @ts-ignore
class ControllerTest {
  constructor(private readonly service: Service) {}

  @Get('test')
  // @ts-ignore
  async get(@Query() dto: DTO) {
    return this.service.get(dto);
  }

  @Get('test/name')
  // @ts-ignore
  async getId() {
    return this.service.getId(null);
  }

  @Get('test/get')
  // @ts-ignore
  async getTest(@Query() dto: DTO) {
    return this.service.get(isValidObject(dto) ? undefined : null);
  }

  @Post('test/post')
  // @ts-ignore
  async postTest(@Body() dto: DTO) {
    return this.service.get(isValidObject(dto) ? undefined : null);
  }
}

let app: any = null;
let app2: any = null;

beforeEach(async () => {
  process.env['NODE_ENV'] = '' as any;

  const moduleRef: TestingModule = await Test.createTestingModule({
    providers: [
      Service,
      { provide: APP_PIPE, useClass: DtoCamelCasePipe },
      { provide: APP_PIPE, useClass: DtoValidatePipe },
    ],
    controllers: [ControllerTest],
  }).compile();

  const moduleRef2: TestingModule = await Test.createTestingModule({
    providers: [
      Service,
      { provide: APP_PIPE, useClass: DtoValidatePipe },
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
    const result = await request(app2.getHttpServer()).get('/test?user_name');
    expect(result.statusCode).toBe(422);

    const result1 = await request(app2.getHttpServer()).get('/test/name');
    expect(result1.statusCode).toBe(422);

    const result2 = await request(app2.getHttpServer()).post('/test/post').send({
      userName: '/test/post',
    });
    expect(result2.statusCode).toBe(777);

    const result3 = await request(app2.getHttpServer()).get('/test/get?userName=test');
    expect(result3.statusCode).toBe(777);

    await app2.close();
  });
});
