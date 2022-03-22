import { BaseClass } from '../common';
import { MetadataContainer } from '../common/base/metadata';

import { toAssembleProperties } from './object';
import { isValidArray, isValidObject } from './validate';

/**
 * Assembling metadata using incoming classes and data.
 *
 * @usageNotes
 * - The incoming 'meta' class's parameter properties must be registered with the 'MetaProperty' decorator; otherwise, the metadata container will not return the correct result when loaded, and the data will be incorrect.
 * - Class methods using this decorator will be loaded only if the return value is an object, otherwise they will return null.
 *
 * @param meta Classes of metadata that must be loaded
 * @param data Data sources being assembled
 *
 * @returns Data after assembly
 *
 * @publicApi
 */
export function toAssembleMetadata<T>(
  meta: BaseClass<T>,
  data: any,
): any {
  const properties = MetadataContainer.discovery(meta?.name);

  if (!isValidArray(properties)) {
    return null;
  }

  if (isValidArray(data)) {
    return data.map((item: any) => toAssembleProperties(properties, item));
  }

  if (isValidObject(data)) {
    return toAssembleProperties(properties, data);
  }
}
