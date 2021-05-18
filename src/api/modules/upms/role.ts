import { defHttp } from '/@/utils/http/axios';
import { ApiPrefix } from '/@/api/model/baseModel';

const Api = {
  RoleList: `${ApiPrefix.UPMS_PREFIX}/role/list`,
  RoleTree: `${ApiPrefix.UPMS_PREFIX}/role/tree`,
  BasicApi: `${ApiPrefix.UPMS_PREFIX}/role`,
  CheckRoleName: `${ApiPrefix.UPMS_PREFIX}/role/checkName`,
};

/**
 * 条件查询
 */
export function getRoleList(params: any) {
  return defHttp.get({
    url: Api.RoleList,
    params,
  });
}

/**
 * 获取菜单树
 */
export function getRoleTree(params: any) {
  return defHttp.get({
    url: Api.RoleTree,
    params,
  });
}

/**
 * 根据ID查询
 */
export function getRole(id: string | number) {
  return defHttp.get({
    url: `${Api.BasicApi}/${id}`,
  });
}

/**
 * 校验名称
 */
export function checkRoleName(params: any) {
  return defHttp.post({
    url: Api.CheckRoleName,
    params,
  });
}

/**
 * 新增
 */
export function addRole(params: any) {
  return defHttp.post({
    url: `${Api.BasicApi}`,
    params,
  });
}

/**
 * 修改
 */
export function updateRole(params: any) {
  return defHttp.put({
    url: `${Api.BasicApi}`,
    params,
  });
}

/**
 * 删除
 */
export function deleteRole(id: string | number) {
  return defHttp.delete({
    url: `${Api.BasicApi}/${id}`,
  });
}
