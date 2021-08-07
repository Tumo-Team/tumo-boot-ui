import { defHttp } from '/@/utils/http/axios';
import { ApiPrefix } from '/@/api/model/baseModel';

const Api = {
  RoleListApi: `${ApiPrefix.UPMS_PREFIX}/role/list`,
  RoleTreeApi: `${ApiPrefix.UPMS_PREFIX}/role/tree`,
  BaseApi: `${ApiPrefix.UPMS_PREFIX}/role`,
};

/**
 * 条件查询
 */
export function getRoleList(params: any) {
  return defHttp.get({
    url: Api.RoleListApi,
    params,
  });
}

/**
 * 获取菜单树
 */
export function getRoleTree(params: any) {
  return defHttp.get({
    url: Api.RoleTreeApi,
    params,
  });
}

/**
 * 根据ID查询
 */
export function getRole(id: string | number) {
  return defHttp.get({
    url: `${Api.BaseApi}/${id}`,
  });
}

/**
 * 新增
 */
export function addRole(params: any) {
  return defHttp.post({
    url: `${Api.BaseApi}`,
    params,
  });
}

/**
 * 修改
 */
export function updateRole(params: any) {
  return defHttp.put({
    url: `${Api.BaseApi}`,
    params,
  });
}

/**
 * 删除
 */
export function deleteRole(id: string | number) {
  return defHttp.delete({
    url: `${Api.BaseApi}/${id}`,
  });
}
