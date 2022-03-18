import { plainToClass } from 'class-transformer';
import { validate, isURL, isIP } from 'class-validator';
import { isArray, isFunction, isNil, isObject, isString, isNumber } from 'lodash';

import {
  BaseClass,
  validateRuleEngine,
  IClassValidationOptions,
} from '../common';

/**
 * Determine if it is a valid value
 *
 * @param value Value to be verified
 *
 * @example
 * isValid(null) // false
 * isValid(undefined) // false
 * isValid(NaN) // true
 * isValid('') // true
 * isValid(0) // true
 * isValid(false) // true
 *
 * @returns boolean
 *
 * @publicApi
 */
export function isValid(value: any): boolean {
  return !isNil(value);
}
/**
 * Determine if it is a valid string
 *
 * @param value Value to be verified
 *
 * @example
 * isValidString('123') // true
 * isValidString(123) // false
 * isValidString(null) // false
 * isValidString(undefined) // false
 * isValidString(NaN) // false
 * isValidString('') // false
 *
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
 * @example
 * isValidNumber(123) // true
 * isValidNumber('123') // false
 * isValidNumber(null) // false
 * isValidNumber(undefined) // false
 * isValidNumber(NaN) // false
 * isValidNumber('') // false
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
 * @example
 * isValidStringNumber('123') // true
 * isValidStringNumber(null) // false
 * isValidStringNumber(undefined) // false
 * isValidStringNumber(NaN) // false
 * isValidStringNumber('') // false
 *
 * @returns boolean
 *
 * @publicApi
 */
export function isValidStringNumber(value: string): boolean {
  return isValid(value) && isNumber(Number(value)) && Number.isSafeInteger(Number(value));
}
/**
 * Determine if it is a valid array
 *
 * @param value Value to be verified
 *
 * @example
 * isValidArray([1]) // true
 * isValidArray([]) // false
 * isValidArray(null) // false
 * isValidArray(undefined) // false
 * isValidArray(NaN) // false
 * isValidArray('') // false
 * isValidArray(0) // false
 *
 * @returns boolean
 *
 * @publicApi
 */
export function isValidArray(value: any[]): boolean {
  return isValid(value) && isArray(value) && value.length > 0;
}
/**
 * Determine if it is a valid object
 *
 * @param value Value to be verified
 *
 * @example
 * isValidObject({}) // true
 * isValidObject(null) // false
 * isValidObject(undefined) // false
 * isValidObject(NaN) // false
 * isValidObject('') // false
 * isValidObject(0) // false
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
 * @example
 * isValidClass(new class {}) // true
 * isValidClass(null) // false
 * isValidClass(undefined) // false
 * isValidClass(NaN) // false
 * isValidClass('') // false
 * isValidClass(0) // false
 *
 * @returns boolean
 *
 * @publicApi
 */
export function isValidClass<T>(value: BaseClass<T>) {
  return isValid(value) && isFunction(value);
}
/**
 * Determine whether or if the incoming url is in a qualified format.
 *
 * @param url
 *
 * @example
 * isValidURL('http://google.com/') -> true
 * isValidURL('google.com') -> false
 * isValidURL('http://127.0.0.1:3000') -> false
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
 * @example
 * isValidIP('http://google.com/') -> false
 * isValidIP('http://127.0.0.1:3000') -> false
 * isValidIP('127.0.0.1') -> true
 * isValidIP('2001:0000:3238:DFE1:63:0000:0000:FEFB', 6) -> true
 *
 * @returns string
 *
 * @publicApi
 */
export function isValidIP(ip: string, version: '4' | '6' | 4 | 6 = '4') {
  return isValidString(ip) && isIP(ip, version);
}
/**
 * Verify property values one by one according to the definition of `class-validator` in the class
 *
 * @param metaClass Validated Classes
 * @param metaObject Validated objects
 * @param options Options passed to validator during validation and exception check mode, The following values can be selected: `Error` or `HttpException`
 *
 * @returns void
 *
 * @publicApi
 */
export async function classValidation(
  metaClass: BaseClass,
  metaObject: any,
  options?: IClassValidationOptions,
) {
  const currentMode = options && options.exceptionMode
    ? options.exceptionMode
    : 'Error';

  const validatorOptions = options && options.validatorOptions
    ? options.validatorOptions
    : { forbidUnknownValues: true };

  if (isValidClass(metaClass) && isValidObject(metaObject)) {
    const errors = await validate(
      plainToClass(metaClass, metaObject),
      validatorOptions,
    );

    if (isValidArray(errors)) {
      validateRuleEngine[currentMode](Object.values(errors[0].constraints)[0]);
    }
  }
}
