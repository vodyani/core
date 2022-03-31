import { BasePromise } from '../../common';
import { isValid, getDefault } from '../../method';

export function ResultDefault(replaced: any = null, callback?: (value: any, replaced: any) => any) {
  return function (_target: any, _property: string, descriptor: TypedPropertyDescriptor<BasePromise>) {
    const method = descriptor.value;

    descriptor.value = async function(...args: any[]) {
      const result = await method.apply(this, args);
      return isValid(callback) ? callback(result, replaced) : getDefault(result, replaced);
    };

    return descriptor;
  };
}
