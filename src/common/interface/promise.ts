/**
 * In queue execution, it's used to manage concurrency and retries.
 */
export interface IQueueOptions {
  /**
   * If the task execution fails, the number of times you can retry.
   */
  retryCount?: number;
  /**
   * If the task execution fails, the number of retry delay time in milliseconds
   */
  retryDelay?: number;
  /**
   * During task execution, it's used to manage task queue concurrency.
   */
  concurrencyCount?: number;
}
