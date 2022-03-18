/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-undefined */
import { describe, it, expect } from '@jest/globals';
import { IsNotEmpty, IsNumber, ValidateIf, IsString } from 'class-validator';

import { isValid } from '../../src/method/validate';
import { FixedContext } from '../../src/decorator/base';
import { ParamValidate } from '../../src/decorator/validate';

class DemoData {
  @IsNumber({ allowNaN: false }, { message: 'number is not valid' })
  @IsNotEmpty({ message: 'id is required' })
  // @ts-ignore
  id: number;

  @ValidateIf((item: DemoData) => isValid(item.name))
  @IsString({ message: 'name is not valid' })
  // @ts-ignore
  name?: string;
}

class Demo {
  @FixedContext
  @ParamValidate()
  // @ts-ignore
  async getData(data: DemoData) {
    return data;
  }

  @FixedContext
  @ParamValidate({
    validatorOptions: { forbidUnknownValues: true },
    exceptionMode: 'Error',
  })
  // @ts-ignore
  async getData2(data: DemoData) {
    return data;
  }
}

describe('decorator.validate', () => {
  it('ParamValidate', async () => {
    const demo = new Demo();

    const data = await demo.getData({ id: 1, name: 'test' });
    expect(data.id).toEqual(1);

    const data2 = await demo.getData({ id: 2 });
    expect(data2.id).toEqual(2);

    try {
      await demo.getData({ id: null });
    } catch (error) {
      expect(error.response).toEqual('id is required');
    }

    try {
      await demo.getData({ id: Number('test') });
    } catch (error) {
      expect(error.response).toEqual('number is not valid');
    }

    try {
      await demo.getData({ id: 1, name: 2 as any });
    } catch (error) {
      expect(error.response).toEqual('name is not valid');
    }

    try {
      await demo.getData2({ id: 1, name: 2 as any });
    } catch (error) {
      expect(error.message).toEqual('name is not valid');
    }
  });
});
