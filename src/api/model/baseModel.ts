/**
 * 接口前缀
 */
export const ApiPrefix = {
  // Auth服务接口前缀
  AUTH_PREFIX: '/auth',
  // Upms服务接口前缀
  UPMS_PREFIX: '/upms',
};

export interface BasicPageParams {
  page: number;
  pageSize: number;
}

export interface BasicFetchResult<T extends any> {
  items: T;
  total: number;
}
