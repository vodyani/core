/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-undefined */
import { describe, it, expect } from '@jest/globals';

import { MetadataContainer } from '../../src';

describe('MetadataContainer', () => {
  it('MetadataContainer.discovery', async () => {
    expect(MetadataContainer.discovery('A').length).toBe(0);
  });
  it('MetadataContainer.discovery', async () => {
    MetadataContainer.registry('B', 'key');
    expect(MetadataContainer.discovery('B')[0]).toBe('key');
  });
});
