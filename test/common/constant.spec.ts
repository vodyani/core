/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-undefined */
import { describe, it, expect } from '@jest/globals';

process.env.NODE_ENV = '';

import { env } from '../../src/common/constant/env';

describe('env', () => {
  it('env', async () => {
    expect(env).toBe('LOCAL');
  });
});
