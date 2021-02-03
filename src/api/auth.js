import request from '@/utils/request'
import { AUTH_API_PREFIX, UPMS_API_PREFIX } from '@/utils/constants'

/**
 * OAuth2身份认证接口
 */
export function login(username, password, captcha, captcha_key) {
  return request({
    url: AUTH_API_PREFIX + '/oauth/token',
    method: 'post',
    headers: {
      'Authorization': 'Basic Y2xpZW50OnNlY3JldA==',
      'Captcha-Key': captcha_key
    },
    params: {
      username,
      password,
      grant_type: 'password',
      captcha
    }
  })
}

/**
 * 获取验证码
 */
export function getCaptcha() {
  return request({
    url: AUTH_API_PREFIX + '/captcha',
    method: 'get'
  })
}

/**
 * 注销登录
 */
export function logout() {
  return request({
    url: AUTH_API_PREFIX + '/logout',
    method: 'delete'
  })
}

/**
 * 构建左侧权限菜单
 */
export function build() {
  return request({
    url: UPMS_API_PREFIX + `/menu/build`,
    method: 'get'
  })
}

/**
 * 获取当前登录用户信息
 */
export function getInfo() {
  return request({
    url: UPMS_API_PREFIX + '/user/info',
    method: 'get'
  })
}

