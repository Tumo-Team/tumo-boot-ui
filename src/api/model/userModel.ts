/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
  captcha: string;
  captchaKey: string;
}

export interface RoleInfo {
  id: string | number;
  name: string;
  alias: string;
  des: string;
}

/**
 * 登录认证接口返回数据结构
 */
export interface LoginResultModel {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}
