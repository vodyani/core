/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-undefined */
import { describe, it, expect } from '@jest/globals';

import { toAssembleClass } from '../../src';

describe('method.metadata', () => {
  it('toAssembleClass', async () => {
    expect(toAssembleClass(null, null)).toBe(null);
  });
});
