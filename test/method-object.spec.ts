/* eslint-disable no-undefined */
import { range } from 'lodash';
import { describe, it, expect } from '@jest/globals';

import { isKeyof, toMatchProperties, toRestoreProperties } from '../src';

describe('method.object', () => {
  it('isKeyof', async () => {
    const sym = Symbol(1);
    const obj = { test: 'test' };
    const obj1 = { 0: 'test' };
    const obj2 = { [sym]: 'test' };
    expect(isKeyof(obj, 'test')).toBe(true);
    expect(isKeyof(obj, 'test1')).toBe(false);
    expect(isKeyof(obj1, 0)).toBe(true);
    expect(isKeyof(obj2, sym)).toBe(true);
  });

  it('test toMatchProperties', () => {
    const obj = { a: { b: { c: { d: { e: { f: [1] }}}}, c: { d: 2 }}};
    expect(toMatchProperties(obj, 'a.b.c.d.e.f', '.')).toEqual([1]);
    expect(toMatchProperties(obj, 'a.c.d')).toEqual(2);
    expect(toMatchProperties(null, null)).toBe(null);
    expect(toMatchProperties(obj, 'a:b')).toBe(null);
  });

  it('test toRestoreProperties', () => {
    expect(toRestoreProperties(1, 'a.b.c.d.e.f.g.l')).toEqual({ 'a': { 'b': { 'c': { 'd': { 'e': { 'f': { 'g': { 'l': 1 }}}}}}}});
    expect(toMatchProperties(toRestoreProperties(1, 'a.b.c.d.e.f.g.l'), 'a.b.c.d.e.f.g.l')).toBe(1);
    expect(toRestoreProperties(1, null)).toBe(null);
    const deepKey = range(10000).join('.');
    expect(toMatchProperties(toRestoreProperties(1, deepKey), deepKey)).toBe(1);
  });
});
