import request from '@/utils/request'
import { UPMS_API_PREFIX } from '@/utils/constants'

/**
 * 获取菜单Tree
 */
export function menuTree() {
  return request({
    url: UPMS_API_PREFIX + `/menu/tree`,
    method: 'get'
  })
}

/**
 * 获取菜单表基础Tree数据
 */
export function menuBaseTree() {
  return request({
    url: UPMS_API_PREFIX + `/menu/base/tree`,
    method: 'get'
  })
}

/**
 * 条件查询
 */
export function menuFilterList(data) {
  return request({
    url: UPMS_API_PREFIX + `/menu/filter/list`,
    method: 'post',
    data
  })
}

/**
 * 校验名称
 */
export function checkMenuName(data) {
  return request({
    url: UPMS_API_PREFIX + `/menu/checkName`,
    method: 'post',
    data
  })
}

/**
 * 根据ID查询
 */
export function findByMenuId(id) {
  return request({
    url: UPMS_API_PREFIX + `/menu/${id}`,
    method: 'get'
  })
}

/**
 * 新增
 */
export function addMenu(data) {
  return request({
    url: UPMS_API_PREFIX + `/menu`,
    method: 'post',
    data
  })
}

/**
 * 修改
 */
export function updateMenu(data) {
  return request({
    url: UPMS_API_PREFIX + `/menu`,
    method: 'put',
    data
  })
}

/**
 * 删除
 */
export function delMenu(id) {
  return request({
    url: UPMS_API_PREFIX + `/menu/${id}`,
    method: 'delete'
  })
}

/**
 * 导出Excel
 */
export function exportMenu() {
  return request({
    url: UPMS_API_PREFIX + `/menu/export`,
    method: 'get',
    responseType: 'blob'
  })
}
