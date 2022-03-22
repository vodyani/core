import { toAssembleMetadata } from '../method/metadata';
import { BaseClass, BasePromise } from '../common/type';
import { MetadataContainer } from '../common/base/metadata';
import { IMetadataAssembleOptions, IPage } from '../common/interface';
import { classValidation, isValidArray, isValidObject } from '../method/validate';

/**
 * The metadata container will be registered with the properties registered with the class property registration decorator and bound to the associated class.
 *
 * @usageNotes
 * - `DO` and `VO` are both applicable.
 *
 * @param target The class to which the metadata will be bound.
 * @param propertyKey The property key to which the metadata will be bound.
 *
 * @publicApi
 */
export function MetaProperty(target: any, propertyName: string) {
  MetadataContainer.registry(target.constructor.name, propertyName);
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
export function Assemble(MetaClass: BaseClass, options?: IMetadataAssembleOptions) {
  return function (_target: any, _propertyName: string, descriptor: TypedPropertyDescriptor<BasePromise>) {
    const method = descriptor.value;
    const validatorOptions = options?.validatorOptions;
    const exceptionMode = options?.exceptionMode || 'HttpException';

    descriptor.value = async function(...args: any[]) {
      let result = await method.apply(this, args);

      if (!isValidObject(result)) {
        return null;
      }

      result = toAssembleMetadata(MetaClass, result);

      if (!options?.ignoreValidate) {
        await classValidation(
          MetaClass,
          result,
          {
            exceptionMode,
            validatorOptions,
          },
        );
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
export function AssembleList(MetaClass: BaseClass, options?: IMetadataAssembleOptions) {
  return function (_target: any, _propertyName: string, descriptor: TypedPropertyDescriptor<BasePromise>) {
    const method = descriptor.value;
    const validatorOptions = options?.validatorOptions;
    const exceptionMode = options?.exceptionMode || 'HttpException';

    descriptor.value = async function(...args: any[]) {
      const list = await method.apply(this, args);

      if (!isValidArray(list)) {
        return [];
      }

      const result = toAssembleMetadata(MetaClass, list);

      if (!options?.ignoreValidate && isValidArray(result)) {
        await Promise.all(
          result.map(
            async (item: any) => classValidation(
              MetaClass,
              item,
              {
                exceptionMode,
                validatorOptions,
              },
            ),
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
export function AssemblePage(MetaClass: BaseClass, options?: IMetadataAssembleOptions) {
  return function (_target: any, _propertyName: string, descriptor: TypedPropertyDescriptor<BasePromise>) {
    const method = descriptor.value;
    const validatorOptions = options?.validatorOptions;
    const exceptionMode = options?.exceptionMode || 'HttpException';

    descriptor.value = async function(...args: any[]): Promise<IPage> {
      const paginate: IPage = await method.apply(this, args);

      if (!isValidArray(paginate?.rows)) {
        return {
          rows: [],
          page: { index: 0, size: 0, count: 0, pageCount: 0 },
        };
      }

      paginate.rows = toAssembleMetadata(MetaClass, paginate.rows);

      if (!options?.ignoreValidate && isValidArray(paginate.rows)) {
        await Promise.all(
          paginate.rows.map(
            async (item: any) => classValidation(
              MetaClass,
              item,
              {
                exceptionMode,
                validatorOptions,
              },
            ),
          ),
        );
      }

      return paginate;
    };

    return descriptor;
  };
}
