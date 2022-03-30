import {
  BaseClass,
  BasePromise,
  isValidArray,
  isValidObject,
  classValidation,
  PaginationResult,
  toAssembleMetadata,
  MetadataAssembleOptions,
} from '../../common';
import { MetadataContainer } from '../../common/base/container';

/**
 * The metadata container will be registered with the properties registered with the class property registration decorator and bound to the associated class.
 *
 * @usageNotes
 * - `DO` and `VO` are both applicable.
 *
 * @param target The class to which the metadata will be bound.
 * @param property The property key to which the metadata will be bound.
 *
 * @publicApi
 */
export function MetaProperty(target: any, property: string) {
  MetadataContainer.registry(target.constructor.name, property);
}
/**
 * Metadata Assembly Decorator
 *
 * @usageNotes
 * - `DO` and `VO` are both applicable.
 * - The incoming `MetaClass` class's parameter properties must be registered with the `MetaProperty` decorator; otherwise, the metadata container will not return the correct result when loaded, and the data will be incorrect.
 * - Class methods using this decorator will be loaded only if the return value is an object, otherwise they will return null.
 * - This decorator can only be applied to the class's asynchronous functions.
 *
 * @param MetaClass Classes of metadata that must be loaded
 * @param options The metadata assembly option is typically used to assemble the defined DTO, VO, and DO.
 *
 * @publicApi
 */
export function Assemble(MetaClass: BaseClass, options?: MetadataAssembleOptions) {
  return function (_target: any, _property: string, descriptor: TypedPropertyDescriptor<BasePromise>) {
    const method = descriptor.value;

    descriptor.value = async function(...args: any[]) {
      let result = await method.apply(this, args);

      if (!isValidObject(result)) {
        return null;
      }

      result = toAssembleMetadata(MetaClass, result);

      if (!options?.ignoreValidate) {
        await classValidation(MetaClass, result, options);
      }

      return result;
    };

    return descriptor;
  };
}
/**
 * Metadata List Assembly Decorator
 *
 * @usageNotes
 * - `DO` and `VO` are both applicable.
 * - The incoming `MetaClass` class's parameter properties must be registered with the `MetaProperty` decorator; otherwise, the metadata container will not return the correct result when loaded, and the data will be incorrect.
 * - Class methods using this decorator will be loaded only if the return value is an object, otherwise they will return null.
 * - This decorator can only be applied to the class's asynchronous functions.
 *
 * @param MetaClass Classes of metadata that must be loaded
 * @param options The metadata assembly option is typically used to assemble the defined DTO, VO, and DO.
 *
 * @returns TypedPropertyDescriptor
 *
 * @publicApi
 */
export function AssembleList(MetaClass: BaseClass, options?: MetadataAssembleOptions) {
  return function (_target: any, _property: string, descriptor: TypedPropertyDescriptor<BasePromise>) {
    const method = descriptor.value;

    descriptor.value = async function(...args: any[]) {
      const list = await method.apply(this, args);

      if (!isValidArray(list)) {
        return [];
      }

      const result = toAssembleMetadata(MetaClass, list);

      if (!options?.ignoreValidate && isValidArray(result)) {
        await Promise.all(
          result.map(
            async (item: any) => classValidation(MetaClass, item, options),
          ),
        );
      }

      return result;
    };

    return descriptor;
  };
}
/**
 * Metadata Page Assembly Decorator
 *
 * @usageNotes
 * - `DO` and `VO` are both applicable.
 * - The incoming `MetaClass` class's parameter properties must be registered with the `MetaProperty` decorator; otherwise, the metadata container will not return the correct result when loaded, and the data will be incorrect.
 * - Class methods using this decorator will be loaded only if the return value is an object, otherwise they will return null.
 * - This decorator can only be applied to the class's asynchronous functions.
 *
 * @param MetaClass Classes of metadata that must be loaded
 * @param options The metadata assembly option is typically used to assemble the defined DTO, VO, and DO.
 *
 * @returns TypedPropertyDescriptor
 *
 * @publicApi
 */
export function AssemblePage(MetaClass: BaseClass, options?: MetadataAssembleOptions) {
  return function (_target: any, _property: string, descriptor: TypedPropertyDescriptor<BasePromise>) {
    const method = descriptor.value;

    descriptor.value = async function(...args: any[]): Promise<PaginationResult> {
      const paginate: PaginationResult = await method.apply(this, args);

      if (!isValidArray(paginate?.rows)) {
        return {
          rows: [],
          paginationInfo: { index: 0, size: 0, count: 0, pageCount: 0 },
        };
      }

      paginate.rows = toAssembleMetadata(MetaClass, paginate.rows);

      if (!options?.ignoreValidate && isValidArray(paginate.rows)) {
        await Promise.all(
          paginate.rows.map(
            async (item: any) => classValidation(MetaClass, item, options),
          ),
        );
      }

      return paginate;
    };

    return descriptor;
  };
}
