import { defHttp } from '/@/utils/http/axios';
import { ApiPrefix } from '/@/api/model/baseModel';

const Api = {
  TokenPage: `${ApiPrefix.SYSTEM_PREFIX}/token/page`,
  DeleteToken: `${ApiPrefix.SYSTEM_PREFIX}/token`,
};

/**
 * 分页、条件查询
 */
export function getTokenPage(params: any) {
  return defHttp.get({
    url: Api.TokenPage,
    params,
  });
}

/**
 * 强制下线
 */
export function deleteToken(token: string) {
  return defHttp.delete({
    url: `${Api.DeleteToken}/${token}`,
  });
}
