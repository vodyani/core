import { cloneDeep } from 'lodash';

import { Metadata } from '../common';

import { isValid, isValidObject, isValidString } from './validate';

export function isKeyof(data: object, key: string | number | symbol): key is keyof typeof data {
  return key in data && Object.prototype.hasOwnProperty.call(data, key);
}

export function toMatchRule(data: object, rule: string): string {
  if (!isValidObject(data) || !isValidString(rule)) {
    return null;
  }

  let invalidKeyCount = 0;

  const str = rule.replace(/{([\s\S]+?)}/g, result => {
    const key = result.slice(1, result.length - 1);

    if (isKeyof(data, key) && isValid(data[key])) {
      return data[key];
    } else {
      invalidKeyCount += 1;
      return null;
    }
  });

  return invalidKeyCount > 0 ? null : str;
}

export function toAssembleProperties(data: object, details: Metadata): any {
  if (!isValidObject(details)) {
    return null;
  }

  const result = cloneDeep(details);
  const stack = [result];

  while (stack.length > 0) {
    const node = stack.pop();

    if (isValidObject(node)) {
      Object.keys(node).forEach(key => {
        const options = node[key];

        let value = null;
        let defaultValue = null;
        let convertHandler = null;

        if (isValidObject(options)) {
          defaultValue = options.default;
          convertHandler = options.convert;
        }

        if (isValid(data) && isKeyof(data, key)) {
          if (isValid(convertHandler)) {
            value = convertHandler(data[key]);
          }

          if (isValid(data[key])) {
            value = data[key];
          }
        } else if (isValid(defaultValue)) {
          value = defaultValue;
        }

        node[key] = value;
      });
    }
  }

  return result;
}

export function toMatchProperties<T = any>(data: any, properties: string, rule = '.'): T {
  if (!isValidObject(data) || !isValidString(properties)) {
    return null;
  }

  const factors = properties.split(rule);

  let node;
  let nodeResult = null;
  let nodeDeepLevel = 0;

  const stack = [];
  stack.push(data);

  while (stack.length > 0) {
    node = stack.pop();

    if (nodeDeepLevel === factors.length) {
      nodeResult = node;
      break;
    }

    if (isValidObject(node)) {
      for (const key of Object.keys(node)) {
        const indexResult = factors.indexOf(key);
        const factorResult = factors[nodeDeepLevel];

        if (key === factorResult && indexResult === nodeDeepLevel) {
          stack.push(node[key]);
          nodeDeepLevel += 1;
          break;
        }
      }
    }
  }

  return nodeResult;
}

export function toRestoreProperties<T = any>(value: any, properties: string, rule = '.'): T {
  if (!isValidString(properties)) {
    return null;
  }

  const factors = properties.split(rule);

  const object = Object();

  let node = object;

  while (factors.length > 0) {
    const key = factors.shift();

    node[key] = Object();

    if (factors.length === 0) {
      node[key] = value;
    } else {
      node = node[key];
    }
  }

  return object;
}
