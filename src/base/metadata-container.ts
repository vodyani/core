import { Container } from '../common';

export class MetadataContainer implements Container {
  private static readonly container: Map<string, string[]> = new Map();

  public static registry(name: string, property: any) {
    if (name && property) {
      const record = MetadataContainer.container.get(name);

      if (record) {
        if (!record.includes(property)) {
          record.push(property);
          MetadataContainer.container.set(name, record);
        }
      } else {
        MetadataContainer.container.set(name, [property]);
      }
    }
  }

  public static discovery(name: string) {
    if (name) {
      const items = MetadataContainer.container.get(name);
      return items && items.length > 0 ? items : [];
    }
  }
}
