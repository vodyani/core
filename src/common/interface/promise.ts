/**
 * Configuration for retrying when the callback function fails
 */
export interface IQueueRetryOptions {
  /**
   * If the task execution fails, the number of times you can retry.
   */
  count: number;
  /**
   * If the task execution fails, the number of retry delay time in milliseconds
   */
  delay: number;
  /**
   * Additional possible parameters to include in the callback function
   */
  args?: any[];
}
/**
 * In queue execution, it's used to manage concurrency and retries.
 */
export interface IQueueOptions {
  /**
   * Configuration for retrying when the callback function fails
   */
  retry?: IQueueRetryOptions;
  /**
   * During task execution, it's used to manage task queue concurrency.
   */
  concurrency?: number;
  /**
   * Before each callback function is called, wait time in milliseconds.
   */
  delay?: number
}
