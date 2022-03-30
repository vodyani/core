import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { isValid, isValidObject, classValidation } from '../common';

/**
 * When the control layer method is called, the `DTO` validation pipeline will perform 'classValidation' data validation.
 * An exception will be thrown if the `DTO` has a class wrapped in a 'classValidator' decorator.
 *
 * @publicApi
 */
@Injectable()
export class DtoValidatePipe implements PipeTransform<any> {
  public async transform(data: any, args: ArgumentMetadata) {
    if (isValidObject(args) && isValid(args.metatype)) {
      await classValidation(args.metatype, data);
    }

    return data;
  }
}
