import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { isValid, classValidation } from '../method/validate';

/**
 * When the control layer method is called, the `DTO` validation pipeline will perform 'classValidation' data validation.
 * An exception will be thrown if the `DTO` has a class wrapped in a 'classValidator' decorator.
 *
 * @publicApi
 */
@Injectable()
export class DTOValidatePipe implements PipeTransform<any> {
  public async transform(data: any, args: ArgumentMetadata) {
    if (isValid(args) && isValid(args.metatype)) {
      await classValidation(args.metatype, data, 'HttpException');
    }

    return data;
  }
}
