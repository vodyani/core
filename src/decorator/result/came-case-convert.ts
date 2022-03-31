import { BasePromise } from '../../common';
import { toDeepCamelCase } from '../../method';

export function ResultCameCase(_target: any, _property: string, descriptor: TypedPropertyDescriptor<BasePromise>) {
  const method = descriptor.value;

  descriptor.value = async function(...args: any[]) {
    const result = await method.apply(this, args);
    return toDeepCamelCase(result);
  };

  return descriptor;
}
