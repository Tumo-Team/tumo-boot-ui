import { defHttp } from '/@/utils/http/axios';
import { ApiPrefix } from '/@/api/model/baseModel';

const Api = {
  BaseApi: `${ApiPrefix.SYSTEM_PREFIX}/dict`,
  BasePageApi: `${ApiPrefix.SYSTEM_PREFIX}/dict/page`,
};

/**
 * 分页、条件查询
 */
export function getDictPage(params: any) {
  return defHttp.get({
    url: Api.BasePageApi,
    params,
  });
}

/**
 * 根据ID查询
 */
export function getDict(id: string | number) {
  return defHttp.get({
    url: `${Api.BaseApi}/${id}`,
  });
}

/**
 * 新增字典
 */
export function addDict(params: any) {
  return defHttp.post({
    url: `${Api.BaseApi}`,
    params,
  });
}

/**
 * 修改字典
 */
export function updateDict(params: any) {
  return defHttp.put({
    url: `${Api.BaseApi}`,
    params,
  });
}

/**
 * 删除
 */
export function deleteDict(id: string | number) {
  return defHttp.delete({
    url: `${Api.BaseApi}/${id}`,
  });
}
