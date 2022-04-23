/* eslint-disable @typescript-eslint/ban-ts-comment */
import { describe, it, expect } from '@jest/globals';

import { FunctionType, FixedContext } from '../src';

describe('declare', () => it('FixedContext', async () => {
  const test = (fn: FunctionType) => {
    return fn();
  };

  // @ts-ignore
  class Demo { @FixedContext getName() { return 'demo' } }

  expect(test(new Demo().getName)).toBe('demo');
}));
