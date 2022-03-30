import { isValid } from '../validate';

/**
 * Make a task for completing the cycle.
 *
 * @param interval Measurement period, in milliseconds.
 * @param callback Functions to be called.
 * @param args Arguments to be passed to the callback.
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
