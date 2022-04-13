import { getDefaultObject, isValidObject, toDeepMerge } from '../method';
import { AutoAssembleOptions, BaseClass, Container, Metadata } from '../common';

export class MetadataContainer implements Container {
  private static readonly container: Map<string, Metadata> = new Map();

  public static registry(className: string, property: string, options?: AutoAssembleOptions) {
    if (className && property) {
      MetadataContainer.container.set(className, { [property]: options });
    }
  }

  public static discovery<T = any>(metaClass: BaseClass<T>) {
    if (metaClass && metaClass.name) {
      let metadata = getDefaultObject(
        MetadataContainer.container.get(metaClass.name),
      );

      // Iterate to find the parent class
      MetadataContainer.internalParent(metaClass).forEach(name => {
        const parentMetadata = MetadataContainer.container.get(name);

        if (isValidObject(parentMetadata)) {
          metadata = toDeepMerge(metadata, parentMetadata);
        }
      });

      return metadata;
    }
  }

  private static internalParent(metaClass: BaseClass) {
    const result = [];
    const stack = [metaClass];

    while (stack.length > 0) {
      const node = stack.pop();
      const parent = Object.getPrototypeOf(node);

      if (node.name) {
        result.push(node.name);
      }

      if (parent && parent.name) {
        stack.push(parent);
      }
    }

    return result;
  }
}
