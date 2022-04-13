import { describe, it, expect } from '@jest/globals';

import { toBuffer, toStream } from '../src';

describe('method.stream', () => {
  it('convert', async () => {
    const buf = Buffer.from('1', 'utf-8');
    const result = await toStream(buf);
    const convertResult = await toBuffer(result);
    expect(convertResult.toString()).toBe('1');
  });
});
