import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { isValid, isValidObject, toValidateClass } from '../method';

@Injectable()
export class DtoValidatePipe implements PipeTransform<any> {
  public async transform(data: any, args: ArgumentMetadata) {
    if (isValidObject(args) && isValid(args.metatype)) {
      await toValidateClass(args.metatype, data);
    }

    return data;
  }
}
