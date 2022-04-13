import { toAssemble } from '../../method';
import { MetadataContainer } from '../../base';
import { AutoAssembleOptions, BaseClass, BasePromise } from '../../common';

export function AutoAssemble(options?: AutoAssembleOptions) {
  return function(target: any, property: string) {
    MetadataContainer.registry(target.constructor.name, property, options);
  };
}

export function ResultAssemble(metadata: BaseClass) {
  return function (target: any, property: string, descriptor: TypedPropertyDescriptor<BasePromise>) {
    const method = descriptor.value;
    const source = `${target.constructor.name}.${property}`;

    descriptor.value = async function(...args: any[]) {
      try {
        const result = await method.apply(this, args);
        return toAssemble(metadata, result);
      } catch (error) {
        error.message = `${error.message} from ${source}`;
        throw error;
      }
    };

    return descriptor;
  };
}
