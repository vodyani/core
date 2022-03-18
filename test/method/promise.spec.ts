import { describe, it, expect } from '@jest/globals';

import {
  toSleep,
  toRetry,
  makeCycleTask,
  makeTaskQueue,
} from '../../src/method/promise';

describe('method.promise', () => {
  it('toSleep', async () => {
    const start = Date.now();
    await toSleep(300);
    expect(Date.now() - start).toBeGreaterThanOrEqual(299);
  });

  it('toRetry', async () => {
    let count = 0;

    const fn = async () => {
      if (count < 1) {
        count += 1;
        throw new Error('error');
      }

      return count;
    };

    const result = await toRetry(3, 100, fn);

    expect(result).toBe(1);
  });

  it('toRetry.error', async () => {
    let result = 0;

    const fn = async () => {
      throw new Error('async error');
    };

    try {
      result = await toRetry(3, 100, fn);
    } catch (error) {
      expect(error.message).toBe('Error: async error');
    }

    expect(result).toBe(0);
  });

  it('makeCycleTask', async () => {
    let count = 0;

    const fn = () => {
      count++;
    };

    const { close } = makeCycleTask(100, fn);

    await toSleep(250);

    close();

    expect(count).toBeGreaterThanOrEqual(1);
  });

  it('makeCycleTask.clear', async () => {
    let count = 0;

    const fn = () => {
      count++;
    };

    const { close } = makeCycleTask(100, fn);

    close();

    await toSleep(300);

    expect(count).toBe(0);
  });

  it('makeTaskQueue', async () => {
    const params = [1, 2, 3, 1, 2, 3];
    const callback = async (num: number) => {
      if (num < 2) {
        return num;
      } else {
        throw new Error();
      }
    };

    const result = await makeTaskQueue(
      params,
      callback,
      { concurrency: 2, delay: 100, retry: { count: 3, delay: 100, args: [1] }},
    );
    expect(result).toEqual([1, null, null, 1, null, null]);

    const params2 = [1, 2, 3, 1, 2, 3];
    const callback2 = async (num: number) => {
      if (num < 2) {
        return num;
      } else {
        throw new Error();
      }
    };

    const result2 = await makeTaskQueue(params2, callback2);
    expect(result2).toEqual([1, null, null, 1, null, null]);

    expect(await makeTaskQueue(null, null)).toEqual([]);
  });
});
