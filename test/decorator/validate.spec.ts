/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-undefined */
import { describe, it, expect } from '@jest/globals';
import { IsNotEmpty, IsNumber, ValidateIf, IsString } from 'class-validator';

import { isValid, FixedContext, ParamValidate, Required, Validated } from '../../src';

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
  async getData(@Validated data: DemoData) {
    return data;
  }

  @FixedContext
  @ParamValidate({
    forbidUnknownValues: true,
  })
  // @ts-ignore
  async getData2(@Validated data: DemoData) {
    return data;
  }

  @FixedContext
  @ParamValidate()
  // @ts-ignore
  async getData3(
    // @ts-ignore
    @Validated data: DemoData,
    // @ts-ignore
    @Required name?: string,
  ) {
    return { name, data };
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
      expect(error).toBeInstanceOf(Error);
    }

    try {
      await demo.getData({ id: Number('test') });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    try {
      await demo.getData({ id: 1, name: 2 as any });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    try {
      await demo.getData2({ id: 1, name: 2 as any });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    try {
      await demo.getData3({ id: 2 });
    } catch (error) {
      expect(error.message).toBe('Demo.getData3 validation error: missing required argument at index [1]');
    }
  });
});
