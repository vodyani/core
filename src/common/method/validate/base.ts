import { Stream } from 'stream';

import { isURL, isIP } from 'class-validator';
import { isArray, isFunction, isNil, isObject, isString, isNumber } from 'lodash';

import { BaseClass } from '../../type';

/**
 * Determine if it is a valid value
 *
 * @param value Value to be verified
 *
 * @returns boolean
 *
 * @publicApi
 */
export function isValid(value: any): boolean {
  return !isNil(value);
}
/**
 * Determine if it is a valid string, the empty string will be identified as `false`
 *
 * @param value Value to be verified
 * @returns boolean
 *
 * @publicApi
 */
export function isValidString(value: string): boolean {
  return isValid(value) && isString(value) && value.length > 0;
}
/**
 * Determine if it is a valid number
 *
 * @param value Value to be verified
 *
 * @returns boolean
 *
 * @publicApi
 */
export function isValidNumber(value: number): boolean {
  return isValid(value) && isNumber(value) && Number.isSafeInteger(value);
}
/**
 * Determine if it is a valid string type, but can be converted to number
 *
 * @param value Value to be verified
 *
 * @returns boolean
 *
 * @publicApi
 */
export function isValidStringNumber(value: string): boolean {
  return isValid(value) && isNumber(Number(value)) && Number.isSafeInteger(Number(value));
}
/**
 * Determine if it is a valid array, the empty array will be identified as `false`
 *
 * @param value Value to be verified
 *
 * @returns boolean
 *
 * @publicApi
 */
export function isValidArray(value: any[]): boolean {
  return isValid(value) && isArray(value) && value.length > 0;
}
/**
 * Determine if it is a valid object, the empty object will be identified as `false`
 *
 * @param value Value to be verified
 *
 * @returns boolean
 *
 * @publicApi
 */
export function isValidObject(value: Record<any, any>): boolean {
  return isValid(value) && isObject(value) && Object.keys(value).length > 0;
}
/**
 * Determine if it is a valid class
 *
 * @param value Value to be verified
 *
 * @returns boolean
 *
 * @publicApi
 */
export function isValidClass<T>(value: BaseClass<T>) {
  return isValid(value) && isFunction(value);
}
/**
 * Determine if it is a valid stream
 *
 * @param value Value to be verified
 *
 * @returns boolean
 *
 * @publicApi
 */
export function isValidStream(value: any) {
  return isValid(value) && value instanceof Stream;
}
/**
 * Determine whether or if the incoming url is in a qualified format.
 *
 * @param url
 *
 * @returns string
 *
 * @publicApi
 */
export function isValidURL(url: string) {
  return isValidString(url) && isURL(url, { require_protocol: ['http', 'https', 'ftp'] });
}
/**
 * Determine whether or if the incoming ip is in a qualified format.
 *
 * @param ip
 *
 * @returns string
 *
 * @publicApi
 */
export function isValidIP(ip: string, version: '4' | '6' | 4 | 6 = '4') {
  return isValidString(ip) && isIP(ip, version);
}

