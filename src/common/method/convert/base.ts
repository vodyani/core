import {
  isValid,
  isValidArray,
  isValidNumber,
  isValidObject,
  isValidStringNumber,
} from '../validate';

/**
 * Take the default value, if the given value is null, undefined then return the default value
 *
 * @param value The object being judged, and if this value is not null, the value is returned
 * @param replaced The optional default value, if value is empty, then the default value is returned
 *
 * @returns The value of the object being judged, or the default value
 *
 * @publicApi
 */
export function getDefault(value: any, replaced: any = null): any {
  return isValid(value) ? value : replaced;
}
/**
 * Return the default value if the given value is '', null or undefined, and convert the default value to a string if the given value is null or undefined.
 *
 * @param value The object being judged, and if this value is not null, the value is returned
 * @param replaced The optional default value, if value is empty, then the default value is returned
 *
 * @returns The value of the object being judged, or the default value
 *
 * @publicApi
 */
export function getDefaultString(value: any, replaced = ''): string {
  return isValid(value) && isValidNumber(String(value).length) ? String(value) : replaced;
}
/**
 * If the given value is null, undefined, or NAN, then return the default value and convert the default value to a number.
 *
 * @param value The object being judged, and if this value is not null, the value is returned
 * @param replaced The optional default value, if value is empty, then the default value is returned
 *
 * @usageNotes
 * - If value is a string in numeric format, it will also be converted to number
 *
 * @returns The value of the object being judged, or the default value
 *
 * @publicApi
 */
export function getDefaultNumber(value: any, replaced = 0): number {
  if (isValidNumber(value)) {
    return value;
  }

  if (isValidStringNumber(value)) {
    return Number(value);
  }

  return replaced;
}
/**
 * If the given value is null, undefined, or [], returns the default value from the default array.
 *
 * @param value The object being judged, and if this value is not null, the value is returned
 * @param replaced The optional default value, if value is empty, then the default value is returned
 *
 * @returns The value of the object being judged, or the default value
 *
 * @publicApi
 */
export function getDefaultArray<T>(value: T[], replaced: T[] = []): T[] {
  return isValidArray(value) ? value : replaced;
}
/**
 * If the given value is null, undefined, or empty, returns the default value from the default array.
 *
 * @param value The object being judged, and if this value is not null, the value is returned
 * @param replaced The optional default value, if value is empty, then the default value is returned
 *
 * @returns The value of the object being judged, or the default value
 *
 * @publicApi
 */
export function getDefaultObject<T>(value: T, replaced: T = Object()): T {
  return isValidObject(value) ? value : replaced;
}
