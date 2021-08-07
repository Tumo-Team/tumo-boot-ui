import { defHttp } from '/@/utils/http/axios';
import { ApiPrefix } from '/@/api/model/baseModel';

const Api = {
  BaseApi: `${ApiPrefix.UPMS_PREFIX}/user`,
  UserListApi: `${ApiPrefix.UPMS_PREFIX}/user/list`,
  UserPageApi: `${ApiPrefix.UPMS_PREFIX}/user/page`,
  CheckUserNameApi: `${ApiPrefix.UPMS_PREFIX}/user/checkName`,
  ResetPassApi: `${ApiPrefix.UPMS_PREFIX}/user/reset`,
};

/**
 * 分页、条件查询
 */
export function getUserList(params: any) {
  return defHttp.get({
    url: Api.UserListApi,
    params,
  });
}

/**
 * 条件查询
 */
export function getUserPage(params: any) {
  return defHttp.get({
    url: Api.UserPageApi,
    params,
  });
}

/**
 * 根据ID查询
 */
export function getUser(id: string | number) {
  return defHttp.get({
    url: `${Api.BaseApi}/${id}`,
  });
}

/**
 * 校验名称
 */
export function checkUserName(params: any) {
  return defHttp.get({
    url: Api.CheckUserNameApi,
    params: {
      id: params.id,
      username: params.username,
    },
  });
}

/**
 * 新增
 */
export function addUser(params: any) {
  return defHttp.post({
    url: `${Api.BaseApi}`,
    params,
  });
}

/**
 * 修改
 */
export function updateUser(params: any) {
  return defHttp.put({
    url: `${Api.BaseApi}`,
    params,
  });
}

/**
 * 删除
 */
export function deleteUser(id: string | number) {
  return defHttp.delete({
    url: `${Api.BaseApi}/${id}`,
  });
}

/**
 * 重置密码
 */
export function resetPass(id: string | number, password: string | null) {
  return defHttp.get({
    url: `${Api.ResetPassApi}`,
    params: {
      id,
      password,
    },
  });
}
