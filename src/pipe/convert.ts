import { Injectable, PipeTransform } from '@nestjs/common';

import { toDeepCamelCase } from '../method';

@Injectable()
export class DtoCamelCasePipe implements PipeTransform<any> {
  public async transform(value: Record<string, any>) {
    return toDeepCamelCase(value);
  }
}
