/* eslint-disable no-undefined */
import { describe, it, expect } from '@jest/globals';
import { range } from 'lodash';

import { toDeepMerge, isKeyof, toHash, toMatchProperties, toMatchRule, toRestoreProperties, toAssembleProperties } from '../../src';

describe('method.object', () => {
  it('isKeyof', async () => {
    const s = Symbol(1);
    const obj = { test: 'test' };
    const obj1 = { 0: 'test' };
    const obj2 = { [s]: 'test' };

    expect(isKeyof(obj, 'test')).toBe(true);
    expect(isKeyof(obj, 'test1')).toBe(false);
    expect(isKeyof(obj1, 0)).toBe(true);
    expect(isKeyof(obj2, s)).toBe(true);
  });

  it('matchRule', async () => {
    expect(toMatchRule({ id: 1 }, 'demo:{id}')).toBe('demo:1');
    expect(toMatchRule({ id: 1 }, 'demo:{id}:{name}')).toBe(null);
    expect(toMatchRule({ id: null }, 'demo:{id}')).toBe(null);
    expect(toMatchRule(null, 'demo:{id}')).toBe(null);
    expect(toMatchRule({}, 'demo:{id}')).toBe(null);
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

  it('test toAssembleProperties', () => {
    expect(toAssembleProperties({ test: 1 }, null)).toBe(null);
    expect(toAssembleProperties(null, [null])).toBe(null);
  });
});
