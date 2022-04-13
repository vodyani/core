/* eslint-disable @typescript-eslint/ban-ts-comment */
import { describe, it, expect } from '@jest/globals';

import {
  toAssemble,
  AutoAssemble,
  ResultAssemble,
  getDefaultString,
} from '../src';

describe('base logic test', () => {
  it('test error parameter', async () => {
    const result = toAssemble(null, {});
    expect(result).toBeNull();
  });

  it('test parameter with error name', async () => {
    const result = toAssemble({ name: null } as any, {});
    expect(result).toBeNull();
  });

  it('test class without assemble', async () => {
    const result = toAssemble(class WITHOUT {}, {});
    expect(result).toBeNull();
  });

  it('test extending assemble', async () => {
    const result = toAssemble(PART_CLASS, {});
    expect(result).toEqual({ partName: 'test', subName: null, baseName: null });
  });

  it('test normal assemble', async () => {
    const result = toAssemble(NORMAL_CLASS, { baseName: 'baseName' });
    expect(result).toEqual({ baseName: 'baseName', test: null });
  });

  it('test convert assemble', async () => {
    const result = toAssemble(CONVERT_CLASS, { baseName: null });
    expect(result).toEqual({ baseName: '' });
  });
});

describe('decorator test', () => {
  it('error call', async () => {
    const instance = new ERROR_CALL_CLASS();
    try {
      await instance.get();
    } catch (error) {
      expect(error.message).toBe('error from ERROR_CALL_CLASS.get');
    }
  });

  it('success', async () => {
    const result = await new SUCCESS_CALL_CLASS().get({ baseName: null });
    expect(result).toEqual({ baseName: '' });
  });
});

// @ts-ignore
class BASE_CLASS { @AutoAssemble() public baseName: string; }
// @ts-ignore
class SUB_CLASS extends BASE_CLASS { @AutoAssemble() public subName: string; }
// @ts-ignore
class PART_CLASS extends SUB_CLASS { @AutoAssemble({ default: 'test' }) public partName: string; }
// @ts-ignore
class NORMAL_CLASS { @AutoAssemble({ default: 'test', convert: getDefaultString }) public baseName: string; @AutoAssemble() public test: string; }
// @ts-ignore
class CONVERT_CLASS { @AutoAssemble({ convert: getDefaultString }) public baseName: string; }
// @ts-ignore
class ERROR_CALL_CLASS { @ResultAssemble(CONVERT_CLASS) public async get() { throw new Error('error') } }
// @ts-ignore
class SUCCESS_CALL_CLASS { @ResultAssemble(CONVERT_CLASS) public async get(data: any) { return data } }
