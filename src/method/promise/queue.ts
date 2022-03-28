import { chunk, flatten } from 'lodash';

import { getDefault, getDefaultArray } from '../convert';
import { QueueTaskCallback, MakeQueueOptions } from '../../common';
import { isValid, isValidArray, isValidNumber, isValidObject } from '../validate';

import { toDelay, toRetry } from './base';

/**
 * Create a task execution queue of equal length based on the list of incoming arguments, then call the callback functions and return the results.
 *
 * @param params List of parameters to be passed to the callback function.
 * @param callback Callback functions that need to be executed asynchronously.
 * @param options In queue execution, it's used to manage concurrency and retries.
 *
 * @publicApi
 */
export async function makeTaskQueue(
  params: any[],
  callback: QueueTaskCallback,
  options: MakeQueueOptions = {},
): Promise<any> {
  if (!isValidArray(params) || !isValid(callback)) {
    return [];
  }

  // enable sleep
  let enableSleep = false;
  // enable retry
  let enableRetry = false;
  // enable concurrency
  let enableConcurrency = false;

  if (isValidObject(options)) {
    if (isValidNumber(options.concurrency)) {
      enableConcurrency = true;
    }

    if (isValidNumber(options.delay)) {
      enableSleep = true;
    }

    if (
      isValidObject(options.retry)
      && isValidNumber(options.retry.count)
      && isValidNumber(options.retry.delay)
    ) {
      enableRetry = true;
    }
  }

  const taskList = enableConcurrency ? chunk(params, options.concurrency) : [params];

  const taskResult = await Promise.all(
    taskList.map(
      async (paramList: any[]) => {
        const result = [];

        for (const paramInfo of paramList) {
          try {
            let details = null;

            if (enableSleep) {
              await toDelay(options.delay);
            }

            if (enableRetry) {
              const { count, delay } = options.retry;
              const retryArgs = getDefaultArray(options.retry.args);

              details = await toRetry(count, delay, callback, paramInfo, ...retryArgs);
            } else {
              details = await await callback(paramInfo);
            }

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
