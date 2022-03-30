import { Injectable, PipeTransform } from '@nestjs/common';

import { toDeepCamelCase } from '../common';

/**
 * The `DTO` conversion pipeline converts the properties of the objects in the parameters to `CamelCase` format when the control layer methods are called.
 *
 * @publicApi
 */
@Injectable()
export class DtoCamelCasePipe implements PipeTransform<any> {
  public async transform(value: Record<string, any>) {
    return toDeepCamelCase(value);
  }
}
