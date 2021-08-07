import { defHttp } from '/@/utils/http/axios';
import { ApiPrefix } from '/@/api/model/baseModel';

const Api = {
  BaseApi: `${ApiPrefix.SYSTEM_PREFIX}/dict/item`,
  BasePageApi: `${ApiPrefix.SYSTEM_PREFIX}/dict/item/page`,
};

/**
 * 分页、条件查询
 */
export function getDictItemPage(params: any) {
  return defHttp.get({
    url: Api.BasePageApi,
    params,
  });
}

/**
 * 根据ID查询
 */
export function getDictItem(id: string | number) {
  return defHttp.get({
    url: `${Api.BaseApi}/${id}`,
  });
}

/**
 * 新增字典项
 */
export function addDictItem(params: any) {
  return defHttp.post({
    url: `${Api.BaseApi}`,
    params,
  });
}

/**
 * 修改字典项
 */
export function updateDictItem(params: any) {
  return defHttp.put({
    url: `${Api.BaseApi}`,
    params,
  });
}

/**
 * 删除字典项
 */
export function deleteDictItem(id: string | number) {
  return defHttp.delete({
    url: `${Api.BaseApi}/${id}`,
  });
}
