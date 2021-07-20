import { defHttp } from '/@/utils/http/axios';
import { ApiPrefix } from '/@/api/model/baseModel';
import { LoginParams, LoginResultModel } from '/@/api/model/userModel';
import { ErrorMessageMode } from '/#/axios';

const Api = {
  Login: `${ApiPrefix.AUTH_PREFIX}/oauth/token`,
  GetCaptcha: `${ApiPrefix.AUTH_PREFIX}/captcha`,
  GetUserInfo: `${ApiPrefix.UPMS_PREFIX}/user/info`,
  BuildMenu: `${ApiPrefix.UPMS_PREFIX}/menu/build`,
  Logout: `${ApiPrefix.AUTH_PREFIX}/logout`,
};

/**
 * 获取验证码
 */
export function getCaptcha() {
  return defHttp.get({
    url: Api.GetCaptcha,
  });
}

/**
 * 登录认证接口
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'message') {
  return defHttp.get<LoginResultModel>(
    {
      url: Api.Login,
      headers: {
        Authorization: 'Basic Y2xpZW50OnNlY3JldA==',
        'Captcha-Key': params.captchaKey,
      },
      params: {
        username: params.username,
        password: params.password,
        captcha: params.captcha,
        grant_type: 'password',
      },
    },
    {
      isTransformResponse: false,
      errorMessageMode: mode,
    }
  );
}

/**
 * 获取当前登录用户信息
 */
export function getUserInfo() {
  return defHttp.get({
    url: Api.GetUserInfo,
  });
}

/**
 * 获取当前登录用户拥有的权限菜单
 */
export function buildMenu() {
  return defHttp.get({
    url: Api.BuildMenu,
  });
}

/**
 * 注销登录
 */
export function logoutApi() {
  return defHttp.delete({
    url: Api.Logout,
  });
}
