/* eslint-disable no-var */
import { describe, it, expect } from '@jest/globals';

import {
  toStringify,
} from '../src';

describe('method.stringify', () => {
  it('simple', async () => {
    expect(toStringify({ test: 1 })).toBe('{"test":1}');
  });

  it('safe undefined stringify', async () => {
    var a: any;
    expect(toStringify([a])).toBe('[null]');
    expect(toStringify({ a })).toBe('{"a":null}');
  });

  it('safe error property stringify', async () => {
    const o = { a: 1 };
    (o as any).o = o;
    expect(toStringify(o)).toBe('{"a":1,"o":"[Circular]"}');
  });
});
