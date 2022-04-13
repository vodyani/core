import { BasePromise } from '../../common';
import { isValid, getDefault, toDeepCamelCase, toDeepSnakeCase } from '../../method';

export function ResultCameCase(target: any, property: string, descriptor: TypedPropertyDescriptor<BasePromise>) {
  const method = descriptor.value;
  const source = `${target.constructor.name}.${property}`;

  descriptor.value = async function(...args: any[]) {
    try {
      const result = await method.apply(this, args);
      return toDeepCamelCase(result);
    } catch (error) {
      error.message = `${error.message} from ${source}`;
      throw error;
    }
  };

  return descriptor;
}

export function ResultSnakeCase(target: any, property: string, descriptor: TypedPropertyDescriptor<BasePromise>) {
  const method = descriptor.value;
  const source = `${target.constructor.name}.${property}`;

  descriptor.value = async function(...args: any[]) {
    try {
      const result = await method.apply(this, args);
      return toDeepSnakeCase(result);
    } catch (error) {
      error.message = `${error.message} from ${source}`;
      throw error;
    }
  };

  return descriptor;
}

export function ResultDefault(replaced: any = null, callback?: (value: any, replaced: any) => any) {
  return function (target: any, property: string, descriptor: TypedPropertyDescriptor<BasePromise>) {
    const method = descriptor.value;
    const source = `${target.constructor.name}.${property}`;

    descriptor.value = async function(...args: any[]) {
      try {
        const result = await method.apply(this, args);
        return isValid(callback) ? callback(result, replaced) : getDefault(result, replaced);
      } catch (error) {
        error.message = `${error.message} from ${source}`;
        throw error;
      }
    };

    return descriptor;
  };
}
