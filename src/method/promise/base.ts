/**
 * Performing delayed waits in asynchronous functions.
 *
 * @param delay Delay time in milliseconds.
 *
 * @publicApi
 */
export function toDelay(delay: number) {
  return new Promise<void>(resolve => setTimeout(() => resolve(), delay));
}
/**
 * Execute the specified number of retries with the given asynchronous callback function.
 *
 * @param count Number of retries.
 * @param delay Retry delay time in milliseconds.
 * @param callback Functions to be called.
 * @param args Arguments to be passed to the callback.
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
    await toDelay(delay);
    result = await toRetry(currentCount, delay, callback, ...args);
  }

  return result;
}
