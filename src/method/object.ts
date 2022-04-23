export function isKeyof(data: object, key: string | number | symbol): key is keyof typeof data {
  return key in data && Object.prototype.hasOwnProperty.call(data, key);
}

export function toMatchProperties<T = any>(data: object, properties: string, rule = '.'): T {
  if (!data || !properties) {
    return null;
  }

  const stack = [];
  const factors = properties.split(rule);

  let node;
  let nodeResult = null;
  let nodeDeepLevel = 0;

  stack.push(data);

  while (stack.length > 0) {
    node = stack.pop();

    if (nodeDeepLevel === factors.length) {
      nodeResult = node;
      break;
    }

    if (node) {
      for (const key of Object.keys(node)) {
        const indexResult = factors.indexOf(key);
        const factorResult = factors[nodeDeepLevel];

        if (key === factorResult && indexResult === nodeDeepLevel) {
          stack.push((node as any)[key]);
          nodeDeepLevel += 1;
          break;
        }
      }
    }
  }

  return nodeResult;
}

export function toRestoreProperties<T = any>(value: any, properties: string, rule = '.'): T {
  if (!properties) {
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
