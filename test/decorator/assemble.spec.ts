/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-undefined */
import { IsNotEmpty } from 'class-validator';
import { describe, it, expect } from '@jest/globals';

import {
  Assemble,
  ResultAssemble,
  ArrayResultAssemble,
  PaginationResultAssemble,
} from '../../src';

class Detail {
  title: string;
}

class Metadata {
  @Assemble
  @IsNotEmpty()
  // @ts-ignore
  public id: number;
}

class Metadata2 {
  @Assemble
  // @ts-ignore
  public id: number;

  @Assemble
  // @ts-ignore
  public name?: string;

  @Assemble
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

  @ResultAssemble(Metadata2, { ignoreValidate: true })
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

  @ResultAssemble(Metadata2, { ignoreValidate: true })
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
    return () => {};
  }

  @ResultAssemble(Metadata)
  // @ts-ignore
  async getData7() {
    return undefined;
  }

  @ResultAssemble(Metadata)
  // @ts-ignore
  async getData8() {
    return {
      id: undefined as any,
    };
  }
}

class Handler2 {
  @ArrayResultAssemble(Metadata)
  // @ts-ignore
  async getData() {
    return [{
      id: 1,
      name: 'test',
      other: 1,
      detail: {
        title: 'test',
      },
    }];
  }

  @ArrayResultAssemble(Metadata2, { ignoreValidate: true })
  // @ts-ignore
  async getData2() {
    return [{
      id: 1,
      name: 'test',
      other: 1,
      detail: {
        title: 'test',
      },
    }];
  }

  @ArrayResultAssemble(Metadata)
  // @ts-ignore
  async getData3() {
    return [{
      id: undefined as any,
    }];
  }

  @ArrayResultAssemble(Metadata2, { ignoreValidate: true })
  // @ts-ignore
  async getData4() {
    return [{
      id: 1,
      name: 'test',
    }];
  }

  @ArrayResultAssemble(Metadata)
  // @ts-ignore
  async getData5() {
    return [{}];
  }

  @ArrayResultAssemble(Metadata)
  // @ts-ignore
  async getData6() {
    return [() => {}];
  }

  @ArrayResultAssemble(Metadata)
  // @ts-ignore
  async getData7() {
    return [undefined];
  }

  @ArrayResultAssemble(Metadata)
  // @ts-ignore
  async getData8() {
    return [{
      id: undefined as any,
    }];
  }

  @ArrayResultAssemble(Metadata)
  // @ts-ignore
  async getData9() {
    return null;
  }
}

class Handler3 {
  @PaginationResultAssemble(Metadata)
  // @ts-ignore
  async getData() {
    return {
      rows: [{
        id: 1,
        name: 'test',
        other: 1,
        detail: {
          title: 'test',
        },
      }],
    };
  }

  @PaginationResultAssemble(Metadata2, { ignoreValidate: true })
  // @ts-ignore
  async getData2() {
    return {
      rows: [{
        id: 1,
        name: 'test',
        other: 1,
        detail: {
          title: 'test',
        },
      }],
    };
  }

  @PaginationResultAssemble(Metadata)
  // @ts-ignore
  async getData3() {
    return {
      rows: [{
        id: undefined as any,
      }],
    };
  }

  @PaginationResultAssemble(Metadata2, { ignoreValidate: true })
  // @ts-ignore
  async getData4() {
    return {
      rows: [{
        id: 1,
        name: 'test',
      }],
    };
  }

  @PaginationResultAssemble(Metadata)
  // @ts-ignore
  async getData5() {
    return { rows: [{}] };
  }

  @PaginationResultAssemble(Metadata)
  // @ts-ignore
  async getData6() {
    return { rows: [() => {}] };
  }

  @PaginationResultAssemble(Metadata)
  // @ts-ignore
  async getData7() {
    return { rows: ([undefined] as any) };
  }

  @PaginationResultAssemble(Metadata)
  // @ts-ignore
  async getData8() {
    return {
      rows: [{
        id: undefined as any,
      }],
    };
  }

  @PaginationResultAssemble(Metadata)
  // @ts-ignore
  async getData9() {
    return null;
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

    const result7 = await handler.getData7();
    expect(result7).toBe(null);

    try {
      await handler.getData8();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('ArrayResultAssemble', async () => {
    const handler = new Handler2();
    const result = (await handler.getData())[0];
    expect(result.id).toBe(1);
    expect(result.name).toBe(undefined);

    const result2 = (await handler.getData2())[0];
    expect(result2.id).toBe(1);
    expect(result2.name).toBe('test');
    expect(result2.other).toBe(undefined);

    try {
      await handler.getData3();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    const result4 = (await handler.getData4())[0];
    expect(result4.id).toBe(1);
    expect(result4.name).toBe('test');
    expect((result4 as any).detail).toBe(null);

    try {
      await handler.getData5();
    } catch (error) {
    }

    try {
      await handler.getData6();
    } catch (error) {
    }

    try {
      await handler.getData7();
    } catch (error) {
    }

    try {
      await handler.getData8();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    const result9 = await handler.getData9();
    expect(result9.length).toBe(0);
  });

  it('PaginationResultAssemble', async () => {
    const handler = new Handler3();
    const result = (await handler.getData()).rows[0];
    expect(result.id).toBe(1);
    expect(result.name).toBe(undefined);

    const result2 = (await handler.getData2()).rows[0];
    expect(result2.id).toBe(1);
    expect(result2.name).toBe('test');
    expect(result2.other).toBe(undefined);

    try {
      await handler.getData3();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    const result4 = (await handler.getData4()).rows[0];
    expect(result4.id).toBe(1);
    expect(result4.name).toBe('test');
    expect((result4 as any).detail).toBe(null);

    try {
      await handler.getData5();
    } catch (error) {
    }

    try {
      await handler.getData6();
    } catch (error) {
    }

    try {
      await handler.getData7();
    } catch (error) {
    }

    try {
      await handler.getData8();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    const result9 = await handler.getData9();
    expect(result9.rows.length).toBe(0);
  });
});
