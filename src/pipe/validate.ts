import { ArgumentMetadata, HttpException, Injectable, PipeTransform } from '@nestjs/common';

import { isValid, isValidObject, toValidateClass } from '../method';

@Injectable()
export class DtoValidatePipe implements PipeTransform<any> {
  public async transform(data: any, argument: ArgumentMetadata) {
    if (isValidObject(argument) && isValid(argument.metatype)) {
      const errorMessage = await toValidateClass(argument.metatype, data);

      if (errorMessage) {
        throw new HttpException(errorMessage, 422);
      }
    }

    return data;
  }
}
