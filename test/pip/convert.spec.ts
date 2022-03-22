/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as request from 'supertest';
import { APP_PIPE } from '@nestjs/core';
import { IsNotEmpty } from 'class-validator';
import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach } from '@jest/globals';
import { Controller, Get, Injectable, Query } from '@nestjs/common';

import { DtoCamelCasePipe } from '../../src/pipe/convert';

class DTO {
  @IsNotEmpty({ message: 'name is required' })
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

beforeEach(async () => {
  process.env['NODE_ENV'] = '' as any;

  const moduleRef: TestingModule = await Test.createTestingModule({
    providers: [
      Service,
      { provide: APP_PIPE, useClass: DtoCamelCasePipe },
    ],
    controllers: [ControllerTest],
  }).compile();


  app = moduleRef.createNestApplication();
  await app.init();
});

describe('pipe', () => {
  it('convert', async () => {
    const result = await request(app.getHttpServer()).get('/test?user_name=test');
    expect(result.body.userName).toBe('test');

    try {
      await request(app.getHttpServer()).get('/test');
    } catch (error) {
      expect(error.response).toBe('?user_name=test');
    }

    await app.close();
  });
});
