import request from '@/utils/request'
import { SYSTEM_API_PREFIX } from '@/utils/constants'

/**
 * 分页、条件查询
 */
export function logList(pagination, data) {
  return request({
    url: SYSTEM_API_PREFIX + `/log/list?page=${pagination.page}&limit=${pagination.limit}`,
    method: 'post',
    data
  })
}

/**
 * 根据ID查询
 */
export function findByLogId(id) {
  return request({
    url: SYSTEM_API_PREFIX + `/log/${id}`,
    method: 'get'
  })
}

/**
 * 删除
 */
export function delLog(id) {
  return request({
    url: SYSTEM_API_PREFIX + `/log/${id}`,
    method: 'delete'
  })
}

/**
 * 导出Excel
 */
export function exportLog() {
  return request({
    url: SYSTEM_API_PREFIX + `/log/export`,
    method: 'get',
    responseType: 'blob'
  })
}
