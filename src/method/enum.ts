import { isValid } from './validate';

export function getEnumKeys<T = any>(data: T): (keyof T)[] {
  const result = [];

  for (const key of Object.keys(data)) {
    const enumKey = key as keyof typeof data;
    const isValidEnumKey = isNaN(Number(enumKey)) && isValid(data[enumKey]);

    if (isValidEnumKey) {
      result.push(enumKey as keyof T);
    }
  }

  return result;
}

export function getEnumValues<T = any>(data: T): (T[keyof T])[] {
  return getEnumKeys(data).map((key: keyof T) => data[key]);
}

export function isKeyofEnum<T = any>(data: T, key: any): key is keyof typeof data {
  return getEnumKeys(data).includes(key);
}

export function isValueOfEnum<T = any>(data: T, value: any): boolean {
  return getEnumValues(data).includes(value);
}
