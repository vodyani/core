import { isValid } from '../validate';

/**
 * Get all property of the enumeration value
 *
 * @param metaEnum enumeration
 *
 * @publicApi
 */
export function getEnumKeys(metaEnum: any): any {
  return Object.keys(metaEnum).filter(key => isNaN(Number(key)) && isValid(metaEnum[key]));
}
/**
 * Get all property value of the enumeration value
 *
 * @param metaEnum enumeration
 *
 * @publicApi
 */
export function getEnumValues(metaEnum: any): any {
  return getEnumKeys(metaEnum).map((key: any) => metaEnum[key]);
}
/**
 * Determine if the property is an enumeration value
 *
 * @param key Properties
 * @param metaEnum enumeration
 *
 * @publicApi
 */
export function isKeyofEnum(key: string, metaEnum: any): boolean {
  return getEnumKeys(metaEnum).includes(key);
}
/**
 * Determine if the property value is an enumeration value
 *
 * @param value Property Value
 * @param metaEnum enumeration
 *
 * @publicApi
 */
export function isValueOfEnum(metaEnum: any, value: any): boolean {
  return getEnumValues(metaEnum).includes(value);
}
