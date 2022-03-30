import { camelCase, merge, snakeCase } from 'lodash';

import { isKeyof } from '../base';
import { isValid, isValidArray, isValidObject } from '../validate';

/**
 * Convert object attribute names to camel format and generate new data by iterating through data attributes (recursive support).
 *
 * @param data Arrays or objects
 *
 * @publicApi
 */
export function toDeepCamelCase(data: any): any {
  if (isValidArray(data)) {
    return data.map((item: any) => toDeepCamelCase(item));
  }

  if (!isValidObject(data)) return data;

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
 * @publicApi
 */
export function toDeepSnakeCase(data: any): any {
  if (isValidArray(data)) {
    return data.map((item: any) => toDeepSnakeCase(item));
  }

  if (!isValidObject(data)) return data;

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
 * @param base Merged data
 * @param source Merged source data
 *
 * @publicApi
 */
export function toDeepMerge(base: any, source: any): any {
  if (!isValid(source) && isValid(base)) {
    return base;
  }

  if (
    (isValidArray(base) && isValidArray(source))
    || (isValidObject(base) && isValidObject(source))
  ) {
    return merge(base, source);
  }

  return source;
}
