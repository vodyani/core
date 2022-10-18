export interface IPage {
  index: number;
  size: number;
  count: number;
  pageCount: number;
}

export interface IPagination<T = any> {
  rows: T;
  page: IPage;
}
