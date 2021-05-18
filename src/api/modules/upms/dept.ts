import { defHttp } from '/@/utils/http/axios';
import { ApiPrefix } from '/@/api/model/baseModel';

const Api = {
  DeptList: `${ApiPrefix.UPMS_PREFIX}/dept/list`,
  DeptTree: `${ApiPrefix.UPMS_PREFIX}/dept/tree`,
  BasicApi: `${ApiPrefix.UPMS_PREFIX}/dept`,
  CheckDeptName: `${ApiPrefix.UPMS_PREFIX}/dept/checkName`,
};

/**
 * 分页、条件查询
 */
export function getDeptList(params: any) {
  return defHttp.post({
    url: Api.DeptList,
    params,
  });
}

/**
 * 获取部门Tree
 */
export function getDeptTree() {
  return defHttp.get({
    url: Api.DeptTree,
  });
}

/**
 * 根据ID查询
 */
export function getDept(id: string | number) {
  return defHttp.get({
    url: `${Api.BasicApi}/${id}`,
  });
}

/**
 * 校验名称
 */
export function checkDeptName(params: any) {
  return defHttp.post({
    url: Api.CheckDeptName,
    params,
  });
}

/**
 * 新增
 */
export function addDept(params: any) {
  return defHttp.post({
    url: `${Api.BasicApi}`,
    params,
  });
}

/**
 * 修改
 */
export function updateDept(params: any) {
  return defHttp.put({
    url: `${Api.BasicApi}`,
    params,
  });
}

/**
 * 删除
 */
export function deleteDept(id: string | number) {
  return defHttp.delete({
    url: `${Api.BasicApi}/${id}`,
  });
}
