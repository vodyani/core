import { camelCase, merge, snakeCase } from 'lodash';

import { isKeyof } from './object';
import { isValid, isValidArray, isValidObject } from './validate';

export function toDeepCamelCase(data: any): any {
  if (isValidArray(data)) {
    return data.map((item: any) => toDeepCamelCase(item));
  }

  if (!isValidObject(data)) return data;

  const newObj = Object();

  Object.keys(data).forEach(key => {
    if (isKeyof(data, key)) {
      const newKey = camelCase(key);
      newObj[newKey] = toDeepCamelCase(data[key]);
    }
  });

  return newObj;
}

export function toDeepSnakeCase(data: any): any {
  if (isValidArray(data)) {
    return data.map((item: any) => toDeepSnakeCase(item));
  }

  if (!isValidObject(data)) return data;

  const newObj = Object();

  Object.keys(data).forEach(key => {
    if (isKeyof(data, key)) {
      const newKey = snakeCase(key);
      newObj[newKey] = toDeepSnakeCase(data[key]);
    }
  });

  return newObj;
}

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
