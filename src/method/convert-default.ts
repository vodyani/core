import {
  isValid,
  isValidArray,
  isValidNumber,
  isValidObject,
  isValidStringNumber,
} from './validate';


export function getDefault(value: any, replaced: any = null): any {
  return isValid(value) ? value : replaced;
}

export function getDefaultString(value: any, replaced = ''): string {
  return isValid(value) && isValidNumber(String(value).length) ? String(value) : replaced;
}

export function getDefaultNumber(value: any, replaced = 0): number {
  if (isValidNumber(value)) {
    return value;
  }

  if (isValidStringNumber(value)) {
    return Number(value);
  }

  return replaced;
}

export function getDefaultArray<T>(value: T[], replaced: T[] = []): T[] {
  return isValidArray(value) ? value : replaced;
}

export function getDefaultObject<T>(value: T, replaced: T = Object()): T {
  return isValidObject(value) ? value : replaced;
}
