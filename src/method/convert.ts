import { camelCase, merge, snakeCase } from 'lodash';

import {
  isValid,
  isValidArray,
  isValidNumber,
  isValidObject,
  isValidStringNumber,
} from './validate';
import { isKeyof } from './object';

/**
 * Convert object attribute names to camel format and generate new data by iterating through data attributes (recursive support).
 *
 * @param data Arrays or objects
 *
 * @example
 * toDeepCamelCase({ 'user_id': 1 }) => { userId: 1 }
 * toDeepCamelCase({ 'user id': 1 }) => { userId: 1 }
 * toDeepCamelCase({ 'user-id': 1 }) => { userId: 1 }
 * toDeepCamelCase([{ 'user-id': 1 }]) => [{ userId: 1 }]
 *
 * @returns Arrays or objects
 *
 * @publicApi
 */
export function toDeepCamelCase(data: any): any {
  if (!isValidObject(data)) return data;

  if (isValidArray(data)) {
    return data.map((item: any) => toDeepCamelCase(item));
  }

  const newObj = Object();

  Object.keys(data).forEach(key => {
    if (isKeyof(key, data)) {
      const newKey = camelCase(key);
      newObj[newKey] = toDeepCamelCase(data[key]);
    }
  });

  return newObj;
}
/**
 * Convert object attribute names to snake format and generate new data by iterating through data attributes (recursive support).
 *
 * @param data Arrays or objects
 *
 * @example
 * toDeepSnakeCase({ userId: 1 }) => { user_id: 1 }
 * toDeepSnakeCase({ 'User Id': 1 }) => { user_id: 1 }
 * toDeepSnakeCase({ 'user-id': 1 }) => { user_id: 1 }
 * toDeepSnakeCase([{ 'user-id': 1 }]) => [{ user_id: 1 }]
 *
 * @returns Arrays or objects
 *
 * @publicApi
 */
export function toDeepSnakeCase(data: any): any {
  if (!isValidObject(data)) return data;

  if (isValidArray(data)) {
    return data.map((item: any) => toDeepSnakeCase(item));
  }

  const newObj = Object();

  Object.keys(data).forEach(key => {
    if (isKeyof(key, data)) {
      const newKey = snakeCase(key);
      newObj[newKey] = toDeepSnakeCase(data[key]);
    }
  });

  return newObj;
}
/**
 * Deep Merge
 *
 * @usageNotes
 * - If the incoming values are objects or arrays, deep merge them;
 * - If the incoming values are other forms of data, return `source`;
 * - If `source` is empty, return `base`.
 * - If `source` and `base` are both arrays or objects, `base` will be altered after the merging.
 *
 * @example
 * const base = 1
 * const source = 2
 * toDeepMerge(base, source) -> 2
 *
 * const base = { a: [{ b: 1 }], b: { c: [{ d: 1 }, { e: 2 }] }};
 * const source = { a: [{ b: 3, g: 6 }, { c: 4 }], b: { c: [{ d: 3 }, { e: 4 }] }}
 * toDeepMerge(base, source) -> { a: [{ b: 3, g: 6 }, { c: 4 }], b: { c: [{ d: 3 }, { e: 4 }] }}

 * const base = [1, 2, 3, { b: 1 }];
 * const source = [4, 5, 6, { a: 1 }, 7];
 * toDeepMerge(base, source) -> [4, 5, 6, { a: 1, b: 1 }, 7]
 *
 * @param base Merged data
 * @param source Merged source data
 *
 * @publicApi
 */
export function toDeepMerge(base: any, source: any): any {
  if (!isValid(source) && isValid(base)) {
    return base;
  }

  if (isValidArray(base) && isValidArray(source) || isValidObject(base) && isValidObject(source)) {
    return merge(base, source);
  }

  return source;
}
/**
 * Take the default value, if the given value is null, undefined then return the default value
 *
 * @param value The object being judged, and if this value is not null, the value is returned
 * @param replaced The optional default value, if value is empty, then the default value is returned
 *
 * @returns The value of the object being judged, or the default value
 *
 * @publicApi
 */
export function getDefault(value: any, replaced: any = null): any {
  return isValid(value) ? value : replaced;
}
/**
 * Return the default value if the given value is '', null or undefined, and convert the default value to a string if the given value is null or undefined.
 *
 * @param value The object being judged, and if this value is not null, the value is returned
 * @param replaced The optional default value, if value is empty, then the default value is returned
 *
 * @returns The value of the object being judged, or the default value
 *
 * @publicApi
 */
export function getDefaultString(value: any, replaced = ''): string {
  return isValid(value) && isValidNumber(String(value).length) ? String(value) : replaced;
}
/**
 * If the given value is null, undefined, or NAN, then return the default value and convert the default value to a number.
 *
 * @param value The object being judged, and if this value is not null, the value is returned
 * @param replaced The optional default value, if value is empty, then the default value is returned
 *
 * @usageNotes
 * - If value is a string in numeric format, it will also be converted to number
 *
 * @returns The value of the object being judged, or the default value
 *
 * @publicApi
 */
export function getDefaultNumber(value: any, replaced = 0): number {
  if (isValidNumber(value)) {
    return value;
  }

  if (isValidStringNumber(value)) {
    return Number(value);
  }

  return replaced;
}
/**
 * If the given value is null, undefined, or [], returns the default value from the default array.
 *
 * @param value The object being judged, and if this value is not null, the value is returned
 * @param replaced The optional default value, if value is empty, then the default value is returned
 *
 * @returns The value of the object being judged, or the default value
 *
 * @publicApi
 */
export function getDefaultArray<T>(value: T[], replaced: T[] = []): T[] {
  return isValidArray(value) ? value : replaced;
}
/**
 * If the given value is null, undefined, or empty, returns the default value from the default array.
 *
 * @param value The object being judged, and if this value is not null, the value is returned
 * @param replaced The optional default value, if value is empty, then the default value is returned
 *
 * @returns The value of the object being judged, or the default value
 *
 * @publicApi
 */
export function getDefaultObject<T>(value: T, replaced: T = Object()): T {
  return isValidObject(value) ? value : replaced;
}
