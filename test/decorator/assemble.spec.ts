/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-undefined */
import { IsNotEmpty } from 'class-validator';
import { describe, it, expect } from '@jest/globals';

import {
  AutoAssemble,
  ResultAssemble,
} from '../../src';

class Detail {
  title: string;
}

class Metadata {
  @AutoAssemble()
  @IsNotEmpty()
  // @ts-ignore
  public id: number;
}

class Metadata2 {
  @AutoAssemble()
  // @ts-ignore
  public id: number;

  @AutoAssemble()
  // @ts-ignore
  public name?: string;

  @AutoAssemble()
  // @ts-ignore
  public detail?: Detail;
}

class Handler {
  @ResultAssemble(Metadata)
  // @ts-ignore
  async getData() {
    return {
      id: 1,
      name: 'test',
      other: 1,
      detail: {
        title: 'test',
      },
    };
  }

  @ResultAssemble(Metadata2)
  // @ts-ignore
  async getData2() {
    return {
      id: 1,
      name: 'test',
      other: 1,
      detail: {
        title: 'test',
      },
    };
  }

  @ResultAssemble(Metadata)
  // @ts-ignore
  async getData3() {
    return {
      id: undefined as any,
    };
  }

  @ResultAssemble(Metadata2)
  // @ts-ignore
  async getData4() {
    return {
      id: 1,
      name: 'test',
    };
  }

  @ResultAssemble(Metadata)
  // @ts-ignore
  async getData5() {
    return {};
  }

  @ResultAssemble(Metadata)
  // @ts-ignore
  async getData6() {
    return undefined;
  }

  @ResultAssemble(Metadata)
  // @ts-ignore
  async getData7() {
    return {
      id: undefined as any,
    };
  }
}

describe('decorator.metadata', () => {
  it('ResultAssemble', async () => {
    const handler = new Handler();
    const result = await handler.getData();
    expect(result.id).toBe(1);
    expect(result.name).toBe(undefined);

    const result2 = await handler.getData2();
    expect(result2.id).toBe(1);
    expect(result2.name).toBe('test');
    expect(result2.other).toBe(undefined);

    try {
      await handler.getData3();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    const result4 = await handler.getData4();
    expect(result4.id).toBe(1);
    expect(result4.name).toBe('test');
    expect((result4 as any).detail).toBe(null);

    const result5 = await handler.getData5();
    expect(result5).toBe(null);

    const result6 = await handler.getData6();
    expect(result6).toBe(null);

    try {
      await handler.getData7();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
