import { describe, it, expect } from '@jest/globals';
import { IsNotEmpty, IsNumber } from 'class-validator';

import {
  isValid,
  isValidURL,
  isValidArray,
  isValidClass,
  isValidNumber,
  isValidObject,
  isValidString,
  classValidation,
  isValidIP,
} from '../../src/method/validate';

describe('method.validate', () => {
  it('isValid', async () => {
    // eslint-disable-next-line no-undefined
    expect(isValid(undefined)).toBe(false);
    expect(isValid(null)).toBe(false);
    expect(isValid([])).toBe(true);
    expect(isValid({})).toBe(true);
    expect(isValid(0)).toBe(true);
    expect(isValid('')).toBe(true);
    expect(isValid(Number(''))).toBe(true);
  });

  it('isValidArray', async () => {
    // eslint-disable-next-line no-undefined
    expect(isValidArray(undefined)).toBe(false);
    expect(isValidArray(null)).toBe(false);
    expect(isValidArray([])).toBe(false);
    expect(isValidArray([{}])).toBe(true);
    expect(isValidArray([0])).toBe(true);
    expect(isValidArray([''])).toBe(true);
    expect(isValidArray([Number('')])).toBe(true);
  });

  it('isValidClass', async () => {
    class DEMO {}

    // eslint-disable-next-line no-undefined
    expect(isValidClass(undefined)).toBe(false);
    expect(isValidClass(null)).toBe(false);
    expect(isValidClass(DEMO)).toBe(true);
  });

  it('isValidNumber', async () => {
    // eslint-disable-next-line no-undefined
    expect(isValidNumber(undefined)).toBe(false);
    expect(isValidNumber(null)).toBe(false);
    expect(isValidNumber(0)).toBe(true);
    expect(isValidNumber(Infinity)).toBe(false);
    expect(isValidNumber(-Infinity)).toBe(false);
    expect(isValidNumber(Number('demo'))).toBe(false);
  });

  it('isValidObject', async () => {
    // eslint-disable-next-line no-undefined
    expect(isValidObject(undefined)).toBe(false);
    expect(isValidObject(null)).toBe(false);
    expect(isValidObject({})).toBe(false);
    expect(isValidObject({ test: 1 })).toBe(true);
  });

  it('isValidString', async () => {
    // eslint-disable-next-line no-undefined
    expect(isValidString(undefined)).toBe(false);
    expect(isValidString(null)).toBe(false);
    expect(isValidString('')).toBe(false);
    expect(isValidString('demo')).toBe(true);
  });

  it('classValidation', async () => {
    class DEMO {
      @IsNotEmpty()
      @IsNumber({ allowNaN: false })
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      test: number;
    }
    // eslint-disable-next-line no-undefined
    expect(await classValidation(DEMO, { test: 1 })).toBe(undefined);

    try {
      await classValidation(
        DEMO,
        { demo: 1 },
        { validatorOptions: { forbidUnknownValues: true }, exceptionMode: 'HttpException' },
      );
    } catch (error) {
      expect(!!error).toBe(true);
    }

    try {
      await classValidation(DEMO, { test: Number('test') });
    } catch (error) {
      expect(!!error).toBe(true);
    }

    try {
      await classValidation(DEMO, { test: 'test' });
    } catch (error) {
      expect(!!error).toBe(true);
    }
  });

  it('isValidURL', async () => {
    expect(isValidURL('https://google.com/')).toBe(true);
    expect(isValidURL('http://google.com/')).toBe(true);
    expect(isValidURL('http:/google.com/')).toBe(false);
    expect(isValidURL('http://127.0.0.1_3000')).toBe(false);
    expect(isValidURL('http://127.0.0.1:3000')).toBe(true);
    expect(isValidURL('127.0.0.1:3000')).toBe(false);
    expect(isValidURL('127.0.0.1')).toBe(false);
    expect(isValidURL('google.com')).toBe(false);
    expect(isValidURL('http://www.www.subdomain.baidu.com/index/subdir/index.html')).toBe(true);
  });

  it('isValidIP', async () => {
    expect(isValidIP('https://google.com/')).toBe(false);
    expect(isValidIP('http://google.com/')).toBe(false);
    expect(isValidIP('http:/google.com/')).toBe(false);
    expect(isValidIP('http://127.0.0.1_3000')).toBe(false);
    expect(isValidIP('http://127.0.0.1:3000')).toBe(false);
    expect(isValidIP('127.0.0.1:3000')).toBe(false);
    expect(isValidIP('127.0.0.1')).toBe(true);
    expect(isValidIP('2001:0000:3238:DFE1:63:0000:0000:FEFB', 6)).toBe(true);
    expect(isValidIP('google.com')).toBe(false);
    expect(isValidIP('http://www.www.subdomain.baidu.com/index/subdir/index.html')).toBe(false);
  });
});
