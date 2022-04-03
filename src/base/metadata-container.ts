import { getDefaultArray, isValidArray } from '../method';
import { AssembleOptions, Container, MetadataDetails } from '../common';

export class MetadataContainer implements Container {
  private static readonly container: Map<string, MetadataDetails[]> = new Map();

  public static registry(name: string, property: string, options?: AssembleOptions) {
    if (name && property) {
      let record = MetadataContainer.container.get(name);

      if (isValidArray(record) && !record.find(e => e.property === property)) {
        record.push({ property, options });
      } else {
        record = [{ property, options }];
      }

      MetadataContainer.container.set(name, record);
    }
  }

  public static discovery(name: string) {
    if (name) {
      const items = MetadataContainer.container.get(name);
      return getDefaultArray(items);
    }
  }
}
