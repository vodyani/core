import { SafeStringify } from '../common';

function safeReplacer(_key: string, value: any) {
  return typeof value === 'undefined' ? null : value;
}

export function toStringify(
  value: any,
  replacer?: (key: string, value: any) => any,
  space?: string | number,
  options?: { depthLimit: number; edgesLimit: number; },
) {
  try {
    return JSON.stringify(value, replacer || safeReplacer, space);
  } catch (error) {
    return SafeStringify(value, replacer || safeReplacer, space, options);
  }
}
