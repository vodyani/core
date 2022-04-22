import { BaseClass } from '../type';

export interface AutoAssembleOptions {
  default?: any;
  each?: boolean;
  type?: BaseClass;
  convert?: (data: any) => any;
}

export interface Metadata {
  [property: string]: AutoAssembleOptions;
}
