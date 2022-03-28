import { resolve } from 'path';

import { describe, it, expect } from '@jest/globals';

import { getRelativePath } from '../../src/method';

const paths = {
  'base': resolve(__dirname, '../common/base.spec.ts'),
  'index': resolve(__dirname, '../../src/index.ts'),
  'current': resolve(__dirname, './path.spec.ts'),
  'enum': resolve(__dirname, './enum.spec.ts'),
};

describe('getRelativePath', () => {
  it('get base.spec.ts', async () => {
    const result = getRelativePath(paths.base, paths.current);
    expect(result).toBe('../common/base.spec.ts');
  });

  it('get enum.spec.ts', async () => {
    const result = getRelativePath(paths.enum, paths.current);
    expect(result).toBe('./enum.spec.ts');
  });

  it('get index.ts', async () => {
    const result = getRelativePath(paths.index, paths.current);
    expect(result).toBe('../../src/index.ts');
  });
});
