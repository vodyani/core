import { BasePromise } from '../../common';
import { toDeepSnakeCase } from '../../method';

export function ResultSnakeCase(_target: any, _property: string, descriptor: TypedPropertyDescriptor<BasePromise>) {
  const method = descriptor.value;

  descriptor.value = async function(...args: any[]) {
    const result = await method.apply(this, args);
    return toDeepSnakeCase(result);
  };

  return descriptor;
}
