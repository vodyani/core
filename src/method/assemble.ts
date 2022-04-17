import { BaseClass } from '../common';
import { MetadataContainer } from '../base';

import { toAssembleProperties } from './object';

export function toAssemble<T = any>(metaClass: BaseClass<T>, data: any): T {
  if (metaClass && metaClass.name) {
    const details = MetadataContainer.discovery(metaClass);
    return toAssembleProperties(data, details);
  }

  return null;
}
