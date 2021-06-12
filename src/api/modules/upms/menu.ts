import { defHttp } from '/@/utils/http/axios';
import { ApiPrefix } from '/@/api/model/baseModel';

const Api = {
  MenuTree: `${ApiPrefix.UPMS_PREFIX}/menu/tree`,
  MenuList: `${ApiPrefix.UPMS_PREFIX}/menu/list`,
  MenuRoleList: `${ApiPrefix.UPMS_PREFIX}/menu/role/list`,
  BasicApi: `${ApiPrefix.UPMS_PREFIX}/menu`,
};

/**
 * 获取菜单表所有数据
 */
export function getMenuTree(params: any) {
  return defHttp.get({
    url: Api.MenuTree,
    params,
  });
}

/**
 * 分页、条件查询
 */
export function getMenuList(params: any) {
  return defHttp.get({
    url: Api.MenuList,
    params,
  });
}

/**
 * 根据ID查询
 */
export function getMenu(id: string | number) {
  return defHttp.get({
    url: `${Api.BasicApi}/${id}`,
  });
}

/**
 * 新增
 */
export function addMenu(params: any) {
  return defHttp.post({
    url: `${Api.BasicApi}`,
    params,
  });
}

/**
 * 修改
 */
export function updateMenu(params: any) {
  return defHttp.put({
    url: `${Api.BasicApi}`,
    params,
  });
}

/**
 * 删除
 */
export function deleteMenu(id: string | number) {
  return defHttp.delete({
    url: `${Api.BasicApi}/${id}`,
  });
}
