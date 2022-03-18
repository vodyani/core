/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-undefined */
import { describe, it, expect } from '@jest/globals';

import {
  ParamCameCase,
  ParamSnakeCase,
  ResultCameCase,
  ResultSnakeCase,
  ResultDefaultConvert,
} from '../../src/decorator/convert';

class Demo {
  @ParamCameCase
  // @ts-ignore
  ParamCameCase(data: object) {
    return data;
  }

  @ParamSnakeCase
  // @ts-ignore
  async ParamSnakeCase(data: object) {
    return data;
  }

  @ResultCameCase
  // @ts-ignore
  async ResultCameCase() {
    return {
      test_result: 1,
    };
  }

  @ResultSnakeCase
  // @ts-ignore
  async ResultSnakeCase() {
    return {
      testResult: 1,
    };
  }

  @ResultDefaultConvert('', null)
  // @ts-ignore
  async ResultDefaultConvert() {
    return null;
  }
}

describe('decorator.convert', () => {
  const demo = new Demo();
  it('ParamCameCase', async () => {
    expect(demo.ParamCameCase({ test_data: 1 })).toEqual({ testData: 1 });
  });

  it('ParamSnakeCase', async () => {
    expect(await demo.ParamSnakeCase({ testData: 1 })).toEqual({ test_data: 1 });
  });

  it('ResultCameCase', async () => {
    expect(await demo.ResultCameCase()).toEqual({ testResult: 1 });
  });

  it('ResultSnakeCase', async () => {
    expect(await demo.ResultSnakeCase()).toEqual({ test_result: 1 });
  });

  it('ResultDefaultConvert', async () => {
    expect(await demo.ResultDefaultConvert()).toEqual('');
  });
});
