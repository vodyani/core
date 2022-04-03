export interface AssembleOptions {
  default?: any;
  convert?: (data: any) => any;
}

export interface MetadataDetails {
  property: string;
  options: AssembleOptions;
}
