export interface PaginationQueryOptions {
  index?: string | number;
  size?: string | number;
  orderBy?: string;
  orderRule?: string;
}

export interface PaginationInfo {
  index?: number;
  size?: number;
  count?: number;
  pageCount?: number;
}

export interface PaginationResult<T = any> {
  rows?: T[];
  page?: PaginationInfo;
}
