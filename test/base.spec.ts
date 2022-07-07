import { describe, it, expect } from '@jest/globals';

import { InstanceContainer } from '../src';

describe('InstanceContainer', () => {
  it('test', async () => {
    const instance = new InstanceContainer();

    expect(instance.get('none')).toBe(null);
    expect(instance.set('name', 'vodyani')).toBe(undefined);
    expect(instance.get('name')).toBe('vodyani');
  });
});
