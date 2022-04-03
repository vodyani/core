/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-undefined */
import { describe, it, expect } from '@jest/globals';

import { toAssemble, Assemble, getDefaultNumber } from '../../src';

export class Metadata {
  @Assemble({ default: 'test' })
  // @ts-ignore
  public name?: string;

  @Assemble({ convert: getDefaultNumber })
  // @ts-ignore
  public age: number;
}

describe('method.metadata', () => {
  it('toAssemble', async () => {
    expect(toAssemble(Metadata, {})).toEqual(null);
    expect(toAssemble(Metadata, { age: '' })).toEqual({ age: 0, name: 'test' });
    expect(toAssemble(Metadata, { age: '1' })).toEqual({ age: 1, name: 'test' });
    expect(toAssemble(Metadata, { age: 'test' })).toEqual({ age: 0, name: 'test' });
  });
});
