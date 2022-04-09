export interface QueueRetryOptions {
  count: number;
  delay: number;
}

export interface MakeQueueOptions {
  retry?: QueueRetryOptions;
  concurrency?: number;
  delay?: number;
  args?: any[];
}
