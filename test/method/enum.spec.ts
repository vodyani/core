import { describe, it, expect } from '@jest/globals';

import {
  isKeyofEnum,
  getEnumKeys,
  isValueOfEnum,
  getEnumValues,
} from '../../src/method/base';

enum TEST {
  TEST_RESULT,
  TEST_VALUE,
  TEST_REPORT = 78,
  TEST_STRING = 'TEST',
}

describe('method.enum', () => {
  it('getEnumKeys', async () => {
    const result = getEnumKeys(TEST);

    expect(result.length).toBe(4);
    expect(result[0]).toBe('TEST_RESULT');
    expect(result[1]).toBe('TEST_VALUE');
    expect(result[2]).toBe('TEST_REPORT');
  });

  it('isKeyofEnum', async () => {
    expect(isKeyofEnum('TEST', TEST)).toBe(false);
    expect(isKeyofEnum('TEST_RESULT', TEST)).toBe(true);
  });

  it('getEnumValues', async () => {
    const result = getEnumValues(TEST);

    expect(result.length).toBe(4);
    expect(result[0]).toBe(0);
    expect(result[1]).toBe(1);
    expect(result[2]).toBe(78);
    expect(result[3]).toBe('TEST');
  });

  it('isValueOfEnum', async () => {
    expect(isValueOfEnum(TEST, '')).toBe(false);
    expect(isValueOfEnum(TEST, 8)).toBe(false);
    expect(isValueOfEnum(TEST, 78)).toBe(true);
  });
});
