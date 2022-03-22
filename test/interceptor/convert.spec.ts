/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Duplex } from 'stream';

import * as request from 'supertest';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { Controller, Get, Injectable, Post } from '@nestjs/common';
import { describe, it, expect, beforeEach } from '@jest/globals';

import {
  ResultSnakeCaseInterceptor,
  ResultCamelCaseInterceptor,
  ResultFormatInterceptor,
} from '../../src/interceptor/convert';

@Injectable()
// @ts-ignore
class Service {
  get() {
    return {
      userName: 'test',
    };
  }
}

@Controller('/')
// @ts-ignore
class ControllerTest {
  constructor(private readonly service: Service) {}

  @Get('test')
  // @ts-ignore
  get() {
    return this.service.get();
  }

  @Get('getBuffer')
  // @ts-ignore
  getBuffer() {
    return Buffer.from([]);
  }

  @Post('stream')
  // @ts-ignore
  getStream() {
    return new Duplex();
  }

  @Get('getArrayBuffer')
  // @ts-ignore
  getArrayBuffer() {
    return new ArrayBuffer(1);
  }
}

let app: any = null;
let app2: any = null;

beforeEach(async () => {
  process.env['NODE_ENV'] = '' as any;

  const moduleRef: TestingModule = await Test.createTestingModule({
    providers: [
      Service,
      { provide: APP_INTERCEPTOR, useClass: ResultSnakeCaseInterceptor },
      { provide: APP_INTERCEPTOR, useClass: ResultFormatInterceptor },
    ],
    controllers: [ControllerTest],
  }).compile();

  const moduleRef2: TestingModule = await Test.createTestingModule({
    providers: [
      Service,
      { provide: APP_INTERCEPTOR, useClass: ResultCamelCaseInterceptor },
      { provide: APP_INTERCEPTOR, useClass: ResultFormatInterceptor },
    ],
    controllers: [ControllerTest],
  }).compile();

  app = moduleRef.createNestApplication();
  await app.init();

  app2 = moduleRef2.createNestApplication();
  await app2.init();
});

describe('interceptor.convert', () => {
  it('ResultSnakeCaseInterceptor & ResultFormatInterceptor', async () => {
    const result = await request(app.getHttpServer()).get('/test');
    expect(result.body.data.user_name).toBe('test');

    const result2 = await request(app.getHttpServer()).get('/getBuffer');
    expect(result2.body).toEqual({ type: 'Buffer', data: [] });

    const result3 = await request(app.getHttpServer()).get('/getArrayBuffer');
    expect(result3.body).toEqual({});

    const result4 = await request(app.getHttpServer()).post('/stream');
    expect(result4.body.allowHalfOpen).toBe(true);

    await app.close();
  });

  it('ResultCamelCaseInterceptor & ResultFormatInterceptor', async () => {
    const result = await request(app2.getHttpServer()).get('/test');
    expect(result.body.data.userName).toBe('test');

    const result2 = await request(app2.getHttpServer()).get('/getBuffer');
    expect(result2.body).toEqual({ type: 'Buffer', data: [] });

    const result3 = await request(app2.getHttpServer()).get('/getArrayBuffer');
    expect(result3.body).toEqual({});

    const result4 = await request(app2.getHttpServer()).post('/stream');
    expect(result4.body.allowHalfOpen).toBe(true);

    await app2.close();
  });
});
