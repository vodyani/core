export interface AutoAssembleOptions {
  default?: any;
  convert?: <T = any>(data: any) => T;
}

export interface MetadataDetails {
  property: string;
  options: AutoAssembleOptions;
}
