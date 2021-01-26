import request from '@/utils/request'

/**
 * OAuth2身份认证接口
 */
export function login(username, password, captcha, captcha_key) {
  return request({
    url: '/auth/oauth/token',
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

export function getCaptcha() {
  return request({
    url: '/auth/captcha',
    method: 'get'
  })
}

/**
 * 构建左侧权限菜单
 */
export function build() {
  return request({
    url: `/system/menu/build`,
    method: 'get'
  })
}

/**
 * 获取当前登录用户信息
 */
export function getInfo() {
  return request({
    url: '/system/user/info',
    method: 'get'
  })
}

/**
 * 注销登录
 */
export function logout() {
  return request({
    url: '/auth/logout',
    method: 'delete'
  })
}
