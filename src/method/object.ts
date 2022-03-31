import { isValid, isValidObject, isValidString } from './validate';


export function isKeyof(data: object, key: string | number | symbol): key is keyof typeof data {
  return key in data && Object.prototype.hasOwnProperty.call(data, key);
}

export function toMatchRule(data: object, rule: string): string {
  if (!isValidObject(data) || !isValidString(rule)) return null;

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

export function toAssembleProperties(data: object, properties: any[]): any {
  if (!isValidObject(data)) return null;

  const newObj = Object();

  properties.forEach(key => {
    newObj[key] = isKeyof(data, key) && isValid(data[key]) ? data[key] : null;
  });

  return newObj;
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
