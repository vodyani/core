import { SafeStringify, ISafeStringifyOptions } from '../common';

export function safeReplacer(_key: string, value: any) {
  return typeof value === 'undefined' ? null : value;
}

/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
 *
 * @param value A JavaScript value, usually an object or array, to be converted.
 * @param replacer A function that transforms the results.
 * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
 * @param options those are also defaults limits when no options object is passed into `toStringify`
 *
 * @usageNotes
 * - options.depthLimit default value is `Number.MAX_SAFE_INTEGER`
 * - options.edgesLimit default value is `Number.MAX_SAFE_INTEGER`
 * - replacer if not passed, `safeReplacer` is used by default, converting values with undefined attributes to null.
 *
 * @returns string
 *
 * @publicApi
 */
export function toStringify(
  value: any,
  replacer?: (key: string, value: any) => any,
  space?: string | number,
  options?: ISafeStringifyOptions,
) {
  try {
    return JSON.stringify(value, replacer || safeReplacer, space);
  } catch (error) {
    return SafeStringify(value, replacer || safeReplacer, space, options);
  }
}
