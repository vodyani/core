/* eslint-disable no-undefined */
import { describe, it, expect } from '@jest/globals';

import {
  toDeepMerge,
  toCamelCase,
  toSnakeCase,
  getDefault,
  getDefaultArray,
  getDefaultNumber,
  getDefaultObject,
  getDefaultString,
} from '../../src/method/convert';

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

  it('toCamelCase', async () => {
    expect(toCamelCase({ 'user_id': 1 }).userId).toBe(1);
    expect(toCamelCase({ 'user id': 1 }).userId).toBe(1);
    expect(toCamelCase({ '_User Id': 1 }).userId).toBe(1);
    expect(toCamelCase({ 'user-id': 1 }).userId).toBe(1);
    expect(toCamelCase([{ 'user-id': 1 }])[0].userId).toBe(1);
    expect(toCamelCase([{ 'user-id': [{ 'USER_ID': 2 }] }])[0].userId[0].userId).toBe(2);
  });

  it('toSnakeCase', async () => {
    expect(toSnakeCase({ 'userId': 1 }).user_id).toBe(1);
    expect(toSnakeCase({ 'user id': 1 }).user_id).toBe(1);
    expect(toSnakeCase({ '_User Id': 1 }).user_id).toBe(1);
    expect(toSnakeCase({ 'userId': 1 }).user_id).toBe(1);
    expect(toSnakeCase([{ 'userId': 1 }])[0].user_id).toBe(1);
    expect(toSnakeCase([{ 'userId': [{ 'userId': 2 }] }])[0].user_id[0].user_id).toBe(2);
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
