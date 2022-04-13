import { merge, camelCase, snakeCase } from 'lodash';

import { isKeyof } from './object';
import { isValid, isValidArray, isValidObject } from './validate';

export function toDeepCamelCase(data: any): any {
  return toDeepConvertKey(data, camelCase);
}

export function toDeepSnakeCase(data: any): any {
  return toDeepConvertKey(data, snakeCase);
}

export function toDeepConvertKey(data: any, convert: (data: any) => any): any {
  if (isValidArray(data)) {
    return data.map((item: any) => toDeepConvertKey(item, convert));
  }

  if (!isValidObject(data)) {
    return data;
  }

  const result = Object();

  Object.keys(data).forEach(key => {
    if (isKeyof(data, key)) {
      const resultKey = convert(key);
      result[resultKey] = toDeepConvertKey(data[key], convert);
    }
  });

  return result;
}

export function toDeepMerge(base: any, source: any): any {
  if (!isValid(source) && isValid(base)) {
    return base;
  }

  const isArray = isValidArray(base) && isValidArray(source);
  const isObject = isValidObject(base) && isValidObject(source);

  return isArray || isObject ? merge(base, source) : source;
}
