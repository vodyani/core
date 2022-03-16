/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-undefined */
import { IsNotEmpty } from 'class-validator';
import { describe, it, expect } from '@jest/globals';

import {
  MetaProperty,
  Assemble,
  AssembleList,
  AssemblePage,
} from '../../src/decorator/metadata';

class Detail {
  title: string;
}

class Metadata {
  @MetaProperty
  @IsNotEmpty()
  // @ts-ignore
  public id: number;
}

class Metadata2 {
  @MetaProperty
  // @ts-ignore
  public id: number;

  @MetaProperty
  // @ts-ignore
  public name?: string;

  @MetaProperty
  // @ts-ignore
  public detail?: Detail;
}

class Handler {
  @Assemble(Metadata)
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

  @Assemble(Metadata2, { ignoreValidate: true })
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

  @Assemble(Metadata)
  // @ts-ignore
  async getData3() {
    return {
      id: undefined as any,
    };
  }

  @Assemble(Metadata2, { ignoreValidate: true })
  // @ts-ignore
  async getData4() {
    return {
      id: 1,
      name: 'test',
    };
  }

  @Assemble(Metadata)
  // @ts-ignore
  async getData5() {
    return {};
  }

  @Assemble(Metadata)
  // @ts-ignore
  async getData6() {
    return () => {};
  }

  @Assemble(Metadata)
  // @ts-ignore
  async getData7() {
    return undefined;
  }

  @Assemble(Metadata, { exceptionMode: 'Error' })
  // @ts-ignore
  async getData8() {
    return {
      id: undefined as any,
    };
  }
}

class Handler2 {
  @AssembleList(Metadata)
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

  @AssembleList(Metadata2, { ignoreValidate: true })
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

  @AssembleList(Metadata)
  // @ts-ignore
  async getData3() {
    return [{
      id: undefined as any,
    }];
  }

  @AssembleList(Metadata2, { ignoreValidate: true })
  // @ts-ignore
  async getData4() {
    return [{
      id: 1,
      name: 'test',
    }];
  }

  @AssembleList(Metadata)
  // @ts-ignore
  async getData5() {
    return [{}];
  }

  @AssembleList(Metadata)
  // @ts-ignore
  async getData6() {
    return [() => {}];
  }

  @AssembleList(Metadata)
  // @ts-ignore
  async getData7() {
    return [undefined];
  }

  @AssembleList(Metadata, { exceptionMode: 'Error' })
  // @ts-ignore
  async getData8() {
    return [{
      id: undefined as any,
    }];
  }

  @AssembleList(Metadata)
  // @ts-ignore
  async getData9() {
    return null;
  }
}

class Handler3 {
  @AssemblePage(Metadata)
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

  @AssemblePage(Metadata2, { ignoreValidate: true })
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

  @AssemblePage(Metadata)
  // @ts-ignore
  async getData3() {
    return {
      rows: [{
        id: undefined as any,
      }],
    };
  }

  @AssemblePage(Metadata2, { ignoreValidate: true })
  // @ts-ignore
  async getData4() {
    return {
      rows: [{
        id: 1,
        name: 'test',
      }],
    };
  }

  @AssemblePage(Metadata)
  // @ts-ignore
  async getData5() {
    return { rows: [{}] };
  }

  @AssemblePage(Metadata)
  // @ts-ignore
  async getData6() {
    return { rows: [() => {}] };
  }

  @AssemblePage(Metadata)
  // @ts-ignore
  async getData7() {
    return { rows: ([undefined] as any) };
  }

  @AssemblePage(Metadata, { exceptionMode: 'Error' })
  // @ts-ignore
  async getData8() {
    return {
      rows: [{
        id: undefined as any,
      }],
    };
  }

  @AssemblePage(Metadata)
  // @ts-ignore
  async getData9() {
    return null;
  }
}

describe('decorator.metadata', () => {
  it('Assemble', async () => {
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
      expect(error.response).toBe('id should not be empty');
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
      expect(error.message).toBe('id should not be empty');
    }
  });

  it('AssembleList', async () => {
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
      expect(error.response).toBe('id should not be empty');
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
      expect(error.message).toBe('id should not be empty');
    }

    const result9 = await handler.getData9();
    expect(result9.length).toBe(0);
  });

  it('AssemblePage', async () => {
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
      expect(error.response).toBe('id should not be empty');
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
      expect(error.message).toBe('id should not be empty');
    }

    const result9 = await handler.getData9();
    expect(result9.rows.length).toBe(0);
  });
});
