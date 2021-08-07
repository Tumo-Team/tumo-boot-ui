import { defHttp } from '/@/utils/http/axios';
import { ApiPrefix } from '/@/api/model/baseModel';

const Api = {
  BasePageApi: `${ApiPrefix.SYSTEM_PREFIX}/log/page`,
  BaseApi: `${ApiPrefix.SYSTEM_PREFIX}/log`,
};

/**
 * 分页、条件查询
 */
export function getLogPage(params: any) {
  return defHttp.get({
    url: Api.BasePageApi,
    params,
  });
}

/**
 * 根据ID查询
 */
export function getLog(id: string | number) {
  return defHttp.get({
    url: `${Api.BaseApi}/${id}`,
  });
}

/**
 * 删除
 */
export function deleteLog(id: string | number) {
  return defHttp.delete({
    url: `${Api.BaseApi}/${id}`,
  });
}
