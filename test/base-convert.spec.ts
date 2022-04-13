/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-undefined */
import { describe, it, expect } from '@jest/globals';

import {
  toDeepMerge,
  toDeepCamelCase,
  toDeepSnakeCase,
  getDefault,
  getDefaultArray,
  getDefaultObject,
  getDefaultString,
  ParamCameCase,
  ParamSnakeCase,
  ResultCameCase,
  ResultSnakeCase,
  ResultDefault,
  getDefaultNumber,
} from '../src';

describe('method.convert', () => {
  it('toDeepMerge', async () => {
    const base = { a: 1, b: 2 };
    const source = { a: 3, c: 4 };
    expect(toDeepMerge(base, source)).toEqual({ a: 3, b: 2, c: 4 });
    expect((base as any).c).toBe(4);

    const base2 = { a: [{ b: 1 }], b: { c: [{ d: 1 }, { e: 2 }] }};
    const source2 = { a: [{ b: 3, g: 6 }, { c: 4 }], b: { c: [{ d: 3 }, { e: 4 }] }};
    expect(toDeepMerge(base2, source2)).toEqual({ a: [{ b: 3, g: 6 }, { c: 4 }], b: { c: [{ d: 3 }, { e: 4 }] }});
    expect((base2.a[1] as any).c).toBe(4);

    const base3 = { test: { test1: 1 }};
    const source3 = { test: { test1: '1', test2: 2 }};
    expect(toDeepMerge(base3, source3)).toEqual({ test: { test1: '1', test2: 2 }});

    const base4 = [1, 2, 3];
    const source4 = [4, 5, 6];
    expect(toDeepMerge(base4, source4)).toEqual([4, 5, 6]);
    expect(base4[0]).toBe(4);

    const base5 = [1, 2, 3, { b: 1 }];
    const source5 = [4, 5, 6, { a: 1 }, 7];
    expect(toDeepMerge(base5, source5)).toEqual([4, 5, 6, { a: 1, b: 1 }, 7]);
    expect(base5[0]).toBe(4);

    const base6 = 1;
    const source6 = 2;
    expect(toDeepMerge(base6, source6)).toBe(2);
    expect(base6).toBe(1);

    const base7 = 1;
    const source7: any = null;
    expect(toDeepMerge(base7, source7)).toBe(1);

    const base8 = [1];
    const source8 = [2];
    expect(toDeepMerge(base8, source8)).toEqual([2]);
  });

  it('toDeepCamelCase', async () => {
    expect(toDeepCamelCase({ 'user_id': 1 }).userId).toBe(1);
    expect(toDeepCamelCase({ 'user id': 1 }).userId).toBe(1);
    expect(toDeepCamelCase({ '_User Id': 1 }).userId).toBe(1);
    expect(toDeepCamelCase({ 'user-id': 1 }).userId).toBe(1);
    expect(toDeepCamelCase([{ 'user-id': 1 }])[0].userId).toBe(1);
    expect(toDeepCamelCase([{ 'user-id': [{ 'USER_ID': 2 }] }])[0].userId[0].userId).toBe(2);
  });

  it('toDeepSnakeCase', async () => {
    expect(toDeepSnakeCase({ 'userId': 1 }).user_id).toBe(1);
    expect(toDeepSnakeCase({ 'user id': 1 }).user_id).toBe(1);
    expect(toDeepSnakeCase({ '_User Id': 1 }).user_id).toBe(1);
    expect(toDeepSnakeCase({ 'userId': 1 }).user_id).toBe(1);
    expect(toDeepSnakeCase([{ 'userId': 1 }])[0].user_id).toBe(1);
    expect(toDeepSnakeCase([{ 'userId': [{ 'userId': 2 }] }])[0].user_id[0].user_id).toBe(2);
  });

  it('getDefault', async () => {
    expect(getDefault(undefined, 1)).toBe(1);
    expect(getDefault(null)).toBe(null);
    expect(getDefault(1, 10)).toBe(1);
    expect(getDefault(1)).toBe(1);
  });

  it('getDefaultNumber', async () => {
    expect(getDefaultNumber(undefined, 1)).toBe(1);
    expect(getDefaultNumber(null)).toBe(0);
    expect(getDefaultNumber(1, 10)).toBe(1);
    expect(getDefaultNumber('1', 10)).toBe(1);
    expect(getDefaultNumber(Number('test'), 1)).toBe(1);
  });

  it('getDefaultString', async () => {
    expect(getDefaultString(undefined, '1')).toBe('1');
    expect(getDefaultString(null)).toBe('');
    expect(getDefaultString(1, '10')).toBe('1');
    expect(getDefaultString('1', '10')).toBe('1');
    expect(getDefaultString(Number('0'), '1')).toBe('0');
  });

  it('getDefaultArray', async () => {
    expect(getDefaultArray(undefined, [1])[0]).toBe(1);
    expect(getDefaultArray(null)[0]).toBe(undefined);
    expect(getDefaultArray([1], [10])[0]).toBe(1);
    expect(getDefaultArray([1], ['10' as any])[0]).toBe(1);
  });

  it('getDefaultObject', async () => {
    expect(getDefaultObject(undefined, { test: 1 }).test).toBe(1);
    expect(getDefaultObject(null).test).toBe(undefined);
    expect(getDefaultObject({}, { test: 1 }).test).toBe(1);
    expect(getDefaultObject({ test: 1 }).test).toBe(1);
  });
});

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

  @ResultDefault('', null)
  // @ts-ignore
  async ResultDefault() {
    return null;
  }

  @ResultDefault(12, getDefaultNumber)
  // @ts-ignore
  async ResultDefaultConvert2() {
    return null;
  }

  @ResultDefault()
  // @ts-ignore
  async ResultDefaultConvert3() {
    return undefined;
  }

  @ResultDefault()
  // @ts-ignore
  async Error1() {
    throw new Error('test');
  }

  @ResultCameCase
  // @ts-ignore
  async Error2() {
    throw new Error('test');
  }

  @ResultSnakeCase
  // @ts-ignore
  async Error3() {
    throw new Error('test');
  }

  @ParamCameCase
  // @ts-ignore
  Error4() {
    throw new Error('test');
  }

  @ParamSnakeCase
  // @ts-ignore
  Error5() {
    throw new Error('test');
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

  it('ResultDefault', async () => {
    expect(await demo.ResultDefault()).toEqual('');
    expect(await demo.ResultDefaultConvert2()).toEqual(12);
    expect(await demo.ResultDefaultConvert3()).toEqual(null);
  });

  it('error', async () => {
    try {
      await demo.Error1();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
    try {
      await demo.Error2();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
    try {
      await demo.Error3();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
    try {
      demo.Error4();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
    try {
      demo.Error5();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
