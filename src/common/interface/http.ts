/**
 * In a http request inquiry, basic paging information is included.
 */
export interface IPageQuery {
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
 * Paging information in the http response body
 */
export interface IPageInfo {
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
 * In the http response body, there is paging information and paging data.
 */
export interface IPage<T = any> {
  /**
   * Arrays of Paging
   */
  rows?: T[];
  /**
   * Paging information in the http response body
   */
  page?: IPageInfo;
}
/**
 * After the formatted interceptor transformation, the resulting http response body
 */
export interface IResponseBody<T = any> {
  /**
   * Specific data information
   */
  data?: T;
  /**
   * Status code on the server
   */
  code?: number;
  /**
   * Status message on the server
   */
  message?: string;
  /**
   * Server request id
   */
  requestId?: string;
  /**
   * Server request time
   */
  requestTime?: number;
  /**
   * Server response time
   */
  responseTime?: number;
}
