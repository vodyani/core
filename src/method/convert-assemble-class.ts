import { BaseClass } from '../common';
import { MetadataContainer } from '../base';

import { toAssembleProperties } from './object';
import { isValidArray, isValidObject } from './validate';

export function toAssembleClass<T>(metadata: BaseClass<T>, data: any): T {
  const properties = MetadataContainer.discovery(metadata?.name);

  if (isValidArray(properties)) {
    if (isValidArray(data)) {
      return data.map((item: any) => toAssembleProperties(item, properties));
    }

    if (isValidObject(data)) {
      return toAssembleProperties(data, properties);
    }
  }

  return null;
}
