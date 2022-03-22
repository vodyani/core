import { isValid, isValidObject, isValidString } from './validate';

/**
 * Determine if the key is a property of the incoming object
 *
 * @param key Object Properties
 * @param object Objects to be judged
 *
 * @returns boolean
 *
 * @publicApi
 */
export function isKeyof(key: string | number | symbol, object: object): key is keyof typeof object {
  return key in object && Object.prototype.hasOwnProperty.call(object, key);
}
/**
 * Matching properties from objects and replacing them with valid values based on string rules,
 *
 * and returning the string corresponding to the rule after an exact match.
 *
 * @usageNotes
 * - Must match all values corresponding to `{}` to return a valid string, otherwise null.
 * - After matching the value of the object, if the value is invalid (null, undefined, NAN), it also returns null.
 * - Invalid data source (null, undefined, NAN) or empty object, also returns null.
 *
 * @param rule Matching rules, the parameters to be matched are wrapped in `{}`
 * @param object Object to be matched
 *
 * @returns string
 *
 * @publicApi
 */
export function matchRule(rule: string, object: object): string {
  if (!isValidObject(object) || !isValidString(rule)) return null;

  let invalidKeyCount = 0;

  const str = rule.replace(/{([\s\S]+?)}/g, result => {
    const key = result.slice(1, result.length - 1);

    if (isKeyof(key, object) && isValid(object[key])) {
      return object[key];
    } else {
      invalidKeyCount += 1;
      return null;
    }
  });

  return invalidKeyCount > 0 ? null : str;
}
/**
 * Returns a new object after assembling data based on the given object attributes.
 *
 * @param properties Property List
 * @param object Data sources being assembled
 *
 * @returns object
 *
 * @publicApi
 */
export function toAssembleProperties(properties: any[], object: Record<string, any>): any {
  if (!isValidObject(object)) return null;

  const newObj = Object();

  properties.forEach(key => {
    newObj[key] = isValid(object[key]) && isKeyof(key, object) ? object[key] : null;
  });

  return newObj;
}
