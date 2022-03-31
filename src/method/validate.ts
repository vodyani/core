import { Stream } from 'stream';

import { isURL, isIP } from 'class-validator';
import { isArray, isFunction, isNil, isObject, isString, isNumber } from 'lodash';

import { BaseClass } from '../common';

export function isValid(value: any): boolean {
  return !isNil(value);
}

export function isValidString(value: string): boolean {
  return isValid(value) && isString(value) && value.length > 0;
}

export function isValidNumber(value: number): boolean {
  return isValid(value) && isNumber(value) && Number.isSafeInteger(value);
}

export function isValidStringNumber(value: string): boolean {
  return isValid(value) && isNumber(Number(value)) && Number.isSafeInteger(Number(value));
}

export function isValidArray(value: any[]): boolean {
  return isValid(value) && isArray(value) && value.length > 0;
}

export function isValidObject(value: Record<any, any>): boolean {
  return isValid(value) && isObject(value) && Object.keys(value).length > 0;
}

export function isValidClass<T>(value: BaseClass<T>) {
  return isValid(value) && isFunction(value);
}

export function isValidStream(value: any) {
  return isValid(value) && value instanceof Stream;
}

export function isValidURL(url: string) {
  return isValidString(url) && isURL(url, { require_protocol: ['http', 'https', 'ftp'] });
}

export function isValidIP(ip: string, version: '4' | '6' | 4 | 6 = '4') {
  return isValidString(ip) && isIP(ip, version);
}
