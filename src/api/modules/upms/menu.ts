import { defHttp } from '/@/utils/http/axios';
import { ApiPrefix } from '/@/api/model/baseModel';

const Api = {
  MenuTreeApi: `${ApiPrefix.UPMS_PREFIX}/menu/tree`,
  MenuListApi: `${ApiPrefix.UPMS_PREFIX}/menu/list`,
  BaseApi: `${ApiPrefix.UPMS_PREFIX}/menu`,
};

/**
 * 获取菜单表所有数据
 */
export function getMenuTree(params: any) {
  return defHttp.get({
    url: Api.MenuTreeApi,
    params,
  });
}

/**
 * 分页、条件查询
 */
export function getMenuList(params: any) {
  return defHttp.get({
    url: Api.MenuListApi,
    params,
  });
}

/**
 * 根据ID查询
 */
export function getMenu(id: string | number) {
  return defHttp.get({
    url: `${Api.BaseApi}/${id}`,
  });
}

/**
 * 新增
 */
export function addMenu(params: any) {
  return defHttp.post({
    url: `${Api.BaseApi}`,
    params,
  });
}

/**
 * 修改
 */
export function updateMenu(params: any) {
  return defHttp.put({
    url: `${Api.BaseApi}`,
    params,
  });
}

/**
 * 删除
 */
export function deleteMenu(id: string | number) {
  return defHttp.delete({
    url: `${Api.BaseApi}/${id}`,
  });
}
