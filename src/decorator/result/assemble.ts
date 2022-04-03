import { toAssemble } from '../../method';
import { MetadataContainer } from '../../base';
import { AssembleOptions, BaseClass, BasePromise } from '../../common';

export function Assemble(options?: AssembleOptions) {
  return function(target: any, property: string) {
    const className = target.constructor.name;
    MetadataContainer.registry(className, property, options);
  };
}

export function ResultAssemble(metadata: BaseClass) {
  return function (_target: any, _property: string, descriptor: TypedPropertyDescriptor<BasePromise>) {
    const method = descriptor.value;

    descriptor.value = async function(...args: any[]) {
      const result = await method.apply(this, args);
      return toAssemble(metadata, result);
    };

    return descriptor;
  };
}
