import { isValid } from '../validate';

/**
 * Get all property of the enumeration value
 *
 * @param data enumeration
 *
 * @publicApi
 */
export function getEnumKeys(data: any): any[] {
  return Object.keys(data).filter(key => isNaN(Number(key)) && isValid(data[key]));
}
/**
 * Get all property value of the enumeration value
 *
 * @param data enumeration
 *
 * @publicApi
 */
export function getEnumValues(data: any): any[] {
  return getEnumKeys(data).map((key: any) => data[key]);
}
/**
 * Determine if the property is an enumeration value
 *
 * @param key Properties
 * @param data enumeration
 *
 * @publicApi
 */
export function isKeyofEnum(key: string, data: any): boolean {
  return getEnumKeys(data).includes(key);
}
/**
 * Determine if the property value is an enumeration value
 *
 * @param value Property Value
 * @param data enumeration
 *
 * @publicApi
 */
export function isValueOfEnum(data: any, value: any): boolean {
  return getEnumValues(data).includes(value);
}
