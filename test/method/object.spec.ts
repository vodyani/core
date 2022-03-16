/* eslint-disable no-undefined */
import { describe, it, expect } from '@jest/globals';

import {
  isKeyof,
  matchRule,
  toAssembleProperties,
} from '../../src/method/object';

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
    expect(matchRule('demo:{id}', { id: 1 })).toBe('demo:1');
    expect(matchRule('demo:{id}:{name}', { id: 1 })).toBe(null);
    expect(matchRule('demo:{id}', { id: null })).toBe(null);
    expect(matchRule('demo:{id}', null)).toBe(null);
    expect(matchRule('demo:{id}', {})).toBe(null);
  });
});
