/* eslint-disable @typescript-eslint/ban-ts-comment */
import { describe, it, expect } from '@jest/globals';
import { IsNotEmpty, IsNumber, ValidateIf, IsString, ValidateNested } from 'class-validator';

import { Type, isValid, FixedContext, ParamValidate, Required, Validated, ArrayValidated, toValidateClass } from '../../src';


class DICT {
  @IsNotEmpty({ message: 'test' })
  // @ts-ignore
  public name: string;
}

class BASE {
  @ValidateNested()
  @Type(() => DICT)
  // @ts-ignore
  public dict: DICT[];
}

class DemoData {
  @IsNumber({ allowNaN: false }, { message: 'number is not valid' })
  @IsNotEmpty({ message: 'id is required' })
  // @ts-ignore
  public id: number;

  @ValidateIf((item: DemoData) => isValid(item.name))
  @IsString({ message: 'name is not valid' })
  // @ts-ignore
  public name?: string;
}

class Demo {
  @FixedContext
  @ParamValidate()
  // @ts-ignore
  async getData(@Validated() data: DemoData) {
    return data;
  }

  @FixedContext
  @ParamValidate({ forbidUnknownValues: true })
  // @ts-ignore
  async getData2(@Validated() data: DemoData) {
    return data;
  }

  @FixedContext
  @ParamValidate()
  // @ts-ignore
  async getData3(
    // @ts-ignore
    @Required() @Validated(422) data: DemoData,
    // @ts-ignore
    @Required('test', 422) name?: string,
  ) {
    return { name, data };
  }

  @FixedContext
  @ParamValidate()
  // @ts-ignore
  async getData4(
    // @ts-ignore
    @Required() @ArrayValidated(DemoData) list: DemoData[],
  ) {
    return list;
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
      expect(error).toBeInstanceOf(Error);
    }

    try {
      await demo.getData4([{ id: '1' as any }]);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  describe('decorator.validate', () => {
    it('toValidateClass', async () => {
      const Base = new BASE();
      Base.dict = [{ name: null }];
      const message = await toValidateClass(BASE, Base);
      expect(message).toBe('test');
    });
  });
});
