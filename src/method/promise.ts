import { chunk, flatten } from 'lodash';

import { MakeQueueOptions } from '../common';

import { getDefault, getDefaultArray } from './convert-default';
import { isValid, isValidArray, isValidNumber, isValidObject } from './validate';


export function toDelay(delay: number) {
  return new Promise<void>(resolve => setTimeout(() => resolve(), delay));
}

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
    await toDelay(delay);
    result = await toRetry(currentCount, delay, callback, ...args);
  }

  return result;
}

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

export async function makeTaskQueue(
  params: any[],
  callback: (param: any, ...args: any[]) => Promise<any>,
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
