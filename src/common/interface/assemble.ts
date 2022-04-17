export interface AutoAssembleOptions {
  default?: any;
  convert?: (data: any) => any;
}

export interface Metadata {
  [property: string]: AutoAssembleOptions;
}
