import { chunk, flatten } from 'lodash';

import { MakeQueueOptions } from '../common';

import { getDefault } from './convert-default';
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
  options?: MakeQueueOptions,
): Promise<any> {
  if (!isValidArray(params) || !isValid(callback)) {
    return [];
  }

  // queue arguments
  let taskArgs: any[] = [];
  // enable sleep
  let enableSleep = false;
  // enable retry
  let enableRetry = false;
  // enable concurrency
  let enableConcurrency = false;

  if (isValidObject(options)) {
    if (isValidArray(options.args)) {
      taskArgs = options.args;
    }

    if (isValidNumber(options.delay)) {
      enableSleep = true;
    }

    if (isValidNumber(options.concurrency)) {
      enableConcurrency = true;
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
      async (params: any[]) => {
        const result = [];

        for (const param of params) {
          try {
            let data = null;

            if (enableSleep) {
              await toDelay(options.delay);
            }

            if (enableRetry) {
              const { count, delay } = options.retry;

              data = await toRetry(count, delay, callback, param, ...taskArgs);
            } else {
              data = await callback(param, ...taskArgs);
            }

            result.push(getDefault(data));
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
