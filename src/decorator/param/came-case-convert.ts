import { toDeepCamelCase } from '../../method';

export function ParamCameCase(_target: any, _property: string, descriptor: TypedPropertyDescriptor<any>) {
  const method = descriptor.value;

  descriptor.value = function(...args: any[]) {
    return method.apply(this, toDeepCamelCase(args));
  };

  return descriptor;
}
