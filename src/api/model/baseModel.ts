/**
 * 接口前缀
 */
export const ApiPrefix = {
  // 基础接口前缀
  BASIC_PREFIX: '/tumo-boot',
  // Auth服务接口前缀
  AUTH_PREFIX: '/auth',
  // Upms服务接口前缀
  UPMS_PREFIX: '/upms',
  // Resource服务接口
  RESOURCE_PREFIX: '/resource',
};

export interface BasicPageParams {
  page: number;
  pageSize: number;
}

export interface BasicFetchResult<T extends any> {
  items: T[];
  total: number;
}
