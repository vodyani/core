/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-undefined */
import { describe, it, expect } from '@jest/globals';

import { toAssembleMetadata } from '../../src/method';

describe('method.metadata', () => {
  it('toAssembleMetadata', async () => {
    expect(toAssembleMetadata(null, null)).toBe(null);
  });
});
