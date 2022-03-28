/* eslint-disable no-undefined */
import { describe, it, expect } from '@jest/globals';
import { range } from 'lodash';

import { toDeepMerge } from '../../src/method';
import { isKeyof, toAssembleProperties, toHash, toMatchProperties, toMatchRule, toRestoreProperties } from '../../src/method/base';

describe('method.object', () => {
  it('isKeyof', async () => {
    const s = Symbol(1);
    const obj = { test: 'test' };
    const obj1 = { 0: 'test' };
    const obj2 = { [s]: 'test' };

    expect(isKeyof('test', obj)).toBe(true);
    expect(isKeyof('test1', obj)).toBe(false);
    expect(isKeyof(0, obj1)).toBe(true);
    expect(isKeyof(s, obj2)).toBe(true);
  });

  it('toAssembleProperties', async () => {
    const obj: { test: string, test1?: string } = { test: 'test', test1: null };

    expect(toAssembleProperties(['test'], obj).test).toBe('test');
    expect(toAssembleProperties(['test', 'test2'], obj).test2).toBe(null);
    expect(toAssembleProperties(['test'], null)).toBe(null);
  });

  it('matchRule', async () => {
    expect(toMatchRule('demo:{id}', { id: 1 })).toBe('demo:1');
    expect(toMatchRule('demo:{id}:{name}', { id: 1 })).toBe(null);
    expect(toMatchRule('demo:{id}', { id: null })).toBe(null);
    expect(toMatchRule('demo:{id}', null)).toBe(null);
    expect(toMatchRule('demo:{id}', {})).toBe(null);
  });

  it('test toHash', () => {
    const object = { name: 'test', value: { test: [1] }};
    const object2 = { name: 'test', value: { test: [2] }};
    const object3 = object;
    const object4 = { name: 'test', value: { test: [1] }};

    expect(toHash(object) === toHash(object2)).toBe(false);
    expect(toHash(object) === toHash(object3)).toBe(true);
    expect(toHash(object) === toHash(object4)).toBe(true);
  });

  it('test toMatchProperties', () => {
    const obj = {
      a: {
        b: {
          c: {
            d: {
              e: {
                f: [1],
              },
            },
          },
        },
        c: {
          d: 2,
        },
      },
    };

    expect(toMatchProperties(obj, 'a.b.c.d.e.f', '.')).toEqual([1]);
    expect(toMatchProperties(obj, 'a.c.d')).toEqual(2);
    expect(toMatchProperties(null, null)).toBe(null);
    expect(toMatchProperties(obj, 'a:b')).toBe(null);
  });

  it('test toRestoreProperties', () => {
    expect(toRestoreProperties(1, 'a.b.c.d.e.f.g.l')).toEqual({ 'a': { 'b': { 'c': { 'd': { 'e': { 'f': { 'g': { 'l': 1 }}}}}}}});
    expect(toDeepMerge(toRestoreProperties(1, 'a.b.c.d.e.f.g.l'), { a: { b: 2 }})).toEqual({ a: { b: 2 }});
    expect(toMatchProperties(toRestoreProperties(1, 'a.b.c.d.e.f.g.l'), 'a.b.c.d.e.f.g.l')).toBe(1);
    expect(toRestoreProperties(1, null)).toBe(null);

    const deepKey = range(10000).join('.');
    expect(toMatchProperties(toRestoreProperties(1, deepKey), deepKey)).toBe(1);
  });
});
