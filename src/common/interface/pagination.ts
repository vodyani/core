/**
 * Parameters passed in during the pagination request.
 */
export interface PaginationOptions {
  /**
   * Index of pages
   */
  index?: string | number;
  /**
   * Size of pages
   */
  size?: string | number;
  /**
   * Sort order fields
   */
  orderBy?: string;
  /**
   * Rules for sorting, `desc`=descending `asc`=ascending
   */
  orderRule?: string;
}
/**
 * The pagination information returned after a paging request
 */
export interface PaginationInfo {
  /**
   * Index of pages
   */
  index?: number;
  /**
   * Size of page
    */
  size?: number;
  /**
   * Number of articles in total
   */
  count?: number;
  /**
   * The total number of items on this page is
   */
  pageCount?: number;
}
/**
 * Pagination results.
 */
export interface PaginationResult<T = any> {
  /**
   * Arrays of Paging
   */
  rows?: T[];
  /**
   * Pagination information in the http response body
   */
  paginationInfo?: PaginationInfo;
}
