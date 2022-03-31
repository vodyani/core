import { RequiredKey } from '../../common';
import { getReflectOwnMetadata } from '../../method';

export function Required(target: any, property: any, propertyIndex: number) {
  const data = getReflectOwnMetadata(RequiredKey, target, property);
  data.push(propertyIndex);
  Reflect.defineMetadata(RequiredKey, data, target, property);
}
