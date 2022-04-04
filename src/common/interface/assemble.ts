export interface AutoAssembleOptions {
  default?: any;
  convert?: (data: any) => any;
}

export interface MetadataDetails {
  property: string;
  options: AutoAssembleOptions;
}
