export interface QueueRetryOptions {
  count: number;
  delay: number;
  args?: any[];
}

export interface MakeQueueOptions {
  retry?: QueueRetryOptions;
  concurrency?: number;
  delay?: number
}
