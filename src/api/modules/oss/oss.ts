import { defHttp } from '/@/utils/http/axios';
import { ApiPrefix } from '/@/api/model/baseModel';

const Api = {
  OssPage: `${ApiPrefix.OSS_PREFIX}/page`,
  BasicApi: `${ApiPrefix.OSS_PREFIX}`,
};

/**
 * 分页、条件查询
 */
export function getOssPage(params: any) {
  return defHttp.get({
    url: Api.OssPage,
    params,
  });
}

/**
 * 根据ID查询
 */
export function getOss(id: string | number) {
  return defHttp.get({
    url: `${Api.BasicApi}/${id}`,
  });
}

/**
 * 修改
 */
export function updateOss(params: any) {
  return defHttp.put({
    url: `${Api.BasicApi}`,
    params,
  });
}

/**
 * 删除
 */
export function deleteOss(id: string | number) {
  return defHttp.delete({
    url: `${Api.BasicApi}/${id}`,
  });
}
