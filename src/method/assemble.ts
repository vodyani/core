import { BaseClass } from '../common';
import { MetadataContainer } from '../base';

import { isValid, isValidObject } from './validate';
import { toAssembleProperties } from './object';

export function toAssemble<T>(metaClass: BaseClass, data: any): T {
  if (
    isValid(metaClass)
    && isValidObject(data)
    && isValid(metaClass.name)
  ) {
    const details = MetadataContainer.discovery(metaClass.name);
    return toAssembleProperties(data, details);
  }

  return null;
}
