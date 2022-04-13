import { toDeepCamelCase, toDeepSnakeCase } from '../../method';

export function ParamCameCase(target: any, property: string, descriptor: TypedPropertyDescriptor<any>) {
  const method = descriptor.value;
  const source = `${target.constructor.name}.${property}`;

  descriptor.value = function(...args: any[]) {
    try {
      return method.apply(this, toDeepCamelCase(args));
    } catch (error) {
      error.message = `${error.message} from ${source}`;
      throw error;
    }
  };

  return descriptor;
}

export function ParamSnakeCase(target: any, property: string, descriptor: TypedPropertyDescriptor<any>) {
  const method = descriptor.value;
  const source = `${target.constructor.name}.${property}`;

  descriptor.value = function(...args: any[]) {
    try {
      return method.apply(this, toDeepSnakeCase(args));
    } catch (error) {
      error.message = `${error.message} from ${source}`;
      throw error;
    }
  };

  return descriptor;
}
