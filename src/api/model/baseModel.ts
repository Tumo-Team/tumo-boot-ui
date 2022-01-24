/**
 * 接口前缀
 */
export const ApiPrefix = {
  // 基础接口前缀
  BASIC_PREFIX: '/tumo-boot',
  // Auth模块接口前缀
  AUTH_PREFIX: '/auth',
  // Upms模块接口前缀
  UPMS_PREFIX: '/upms',
  // System模块接口前缀
  SYSTEM_PREFIX: '/system',
};

export interface BasicPageParams {
  page: number;
  pageSize: number;
}

export interface BasicFetchResult<T> {
  items: T[];
  total: number;
}
