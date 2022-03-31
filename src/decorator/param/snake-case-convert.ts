import { toDeepSnakeCase } from '../../method';

export function ParamSnakeCase(_target: any, _property: string, descriptor: TypedPropertyDescriptor<any>) {
  const method = descriptor.value;

  descriptor.value = function(...args: any[]) {
    return method.apply(this, toDeepSnakeCase(args));
  };

  return descriptor;
}
