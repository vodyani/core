export type Subset<T, K extends keyof T = any> = T[K][keyof T[K]];
export type SubKey<T, K extends keyof T = any> = keyof Subset<T, K>;
