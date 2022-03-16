import { chunk, flatten } from 'lodash';

import { QueueTaskCallback, IQueueOptions } from '../common';

import { getDefault } from './convert';
import { isValid, isValidArray, isValidNumber } from './validate';

/**
 * toSleep
 *
 * @param delay Delay time in milliseconds
 *
 * @publicApi
 */
export function toSleep(delay: number) {
  return new Promise<void>(resolve => setTimeout(() => resolve(), delay));
}
/**
 * toRetry
 *
 * @param count Number of retries
 * @param delay Retry delay time in milliseconds
 * @param callback Functions to be called
 * @param `...args` Arguments to be passed to the callback
 *
 * @publicApi
 */
export async function toRetry(count: number, delay: number, callback: Function, ...args: any[]): Promise<any> {
  let result = null;
  let currentCount = count;

  try {
    result = await callback(...args);
  } catch (error) {
    if (currentCount === 0) {
      throw new Error(error);
    }

    currentCount--;
    await toSleep(delay);
    result = await toRetry(currentCount, delay, callback, ...args);
  }

  return result;
}
/**
 * Make a task for completing the cycle.
 *
 * @param interval Measurement period, in milliseconds
 * @param callback Functions to be called
 * @param `...args` Arguments to be passed to the callback
 *
 * @returns The clearTimeout callback function
 *
 * @publicApi
 */
export function makeCycleTask(interval: number, callback: Function, ...args: any[]) {
  let timeHandler: NodeJS.Timeout = null;

  const close = () => {
    if (isValid(timeHandler)) {
      clearTimeout(timeHandler);
      timeHandler = null;
    }
  };

  const regularly = () => {
    close();

    timeHandler = setTimeout(
      () => {
        callback(...args);

        regularly();
      },
      interval,
    );
  };

  regularly();

  return { close };
}

/**
 * Create a task execution queue of equal length based on the list of incoming arguments, then call the callback functions in order and return the results.
 *
 * @param paramList List of parameters to be passed to the callback function.
 * @param callback Callback functions that need to be executed asynchronously.
 * @param options In queue execution, it's used to manage concurrency and retries.
 *
 * @returns any[]
 *
 * @publicApi
 */
export async function makeTaskQueue(
  paramList: any[],
  callback: QueueTaskCallback,
  options: IQueueOptions = {},
): Promise<any> {
  if (!isValidArray(paramList) || !isValid(callback)) {
    return [];
  }

  const taskList = isValidNumber(options.concurrencyCount)
    /**
     * Creates an array of elements split into groups the length of size.
     * If collection can’t be split evenly, the final chunk will be the remaining elements.
     */
    ? chunk(paramList, options.concurrencyCount)
    // By default, operations are carried out in a single queue sequence.
    : [paramList];

  const taskResult = await Promise.all(
    taskList.map(
      async (list: any[]) => {
        const result = [];

        for (const param of list) {
          try {
            const details = isValidNumber(options.retryCount) && isValidNumber(options.retryDelay)
              ? await toRetry(options.retryCount, options.retryDelay, callback, param)
              : await callback(param);

            result.push(getDefault(details));
          } catch (error) {
            result.push(null);
          }
        }

        return result;
      },
    ),
  );

  // Flattens array a single level deep.
  return flatten(taskResult);
}
