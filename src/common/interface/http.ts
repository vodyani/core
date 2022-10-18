export interface IRequestPage {
  index?: number;
  size?: number;
  orderBy?: string;
  orderRule?: 'desc' | 'DESC' | 'asc' | 'ASC';
}

export interface IResponseBody<T = any> {
  data?: T;
  code?: number;
  message?: string;
  requestId?: string;
  requestTime?: number;
  responseTime?: number;
}
