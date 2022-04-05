export interface RemoteConfigDetails<OPTIONS = any, EXTRA = any> {
  key: string;
  options?: OPTIONS;
  extra?: EXTRA;
}
