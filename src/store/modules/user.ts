import type { UserInfo } from '/#/store';
import type { ErrorMessageMode } from '/#/axios';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { RoleEnum } from '/@/enums/roleEnum';
import { PageEnum } from '/@/enums/pageEnum';
import { PERMS_KEY, ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '/@/enums/cacheEnum';

import { getAuthCache, setAuthCache } from '/@/utils/auth';
import { GetUserInfoByUserIdModel, LoginParams } from '/@/api/model/userModel';

import { getUserInfo, loginApi, logoutApi } from '/@/api/auth';

import { useI18n } from '/@/hooks/web/useI18n';
import { useMessage } from '/@/hooks/web/useMessage';
import { router } from '/@/router';
import { usePermissionStore } from '/@/store/modules/permission';
import { RouteRecordRaw } from 'vue-router';
import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';

interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  roleList: RoleEnum[];
  permList: string[];
  sessionTimeout?: boolean;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
    // roleList
    roleList: [],
    // 权限标识列表
    permList: [],
    // Whether the login expired
    sessionTimeout: false,
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {};
    },
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY);
    },
    getRoleList(): RoleEnum[] {
      return this.roleList.length > 0 ? this.roleList : getAuthCache<RoleEnum[]>(ROLES_KEY);
    },
    getPermList(): string[] {
      return this.permList.length > 0 ? this.permList : getAuthCache<string[]>(PERMS_KEY);
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout;
    },
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info;
      setAuthCache(TOKEN_KEY, info);
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList;
      setAuthCache(ROLES_KEY, roleList);
    },
    setPermList(permList: string[]) {
      this.permList = permList;
      setAuthCache(PERMS_KEY, permList);
    },
    setUserInfo(info: UserInfo) {
      this.userInfo = info;
      setAuthCache(USER_INFO_KEY, info);
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    resetState() {
      this.userInfo = null;
      this.token = '';
      this.roleList = [];
      this.sessionTimeout = false;
    },
    /**
     * @description: login
     */
    async login(
      params: LoginParams & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      }
    ): Promise<GetUserInfoByUserIdModel | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params;
        const data = await loginApi(loginParams, mode);
        const { access_token, token_type } = data;

        // save token
        this.setToken(`${token_type} ${access_token}`);
        // get user info
        const userInfo = await this.getUserInfoAction();

        const sessionTimeout = this.sessionTimeout;
        if (sessionTimeout) {
          this.setSessionTimeout(false);
        } else if (goHome) {
          const permissionStore = usePermissionStore();
          if (!permissionStore.isDynamicAddedRoute) {
            const routes = await permissionStore.buildRoutesAction();
            routes.forEach((route) => {
              router.addRoute(route as unknown as RouteRecordRaw);
            });
            router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
            permissionStore.setDynamicAddedRoute(true);
          }
          await router.replace(userInfo.homePath || PageEnum.BASE_HOME);
        }
        return userInfo;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getUserInfoAction() {
      const userInfo = await getUserInfo();
      const { user, roles, perms } = userInfo;
      const roleList = roles.map((item) => item.value) as RoleEnum[];
      this.setUserInfo(user);
      this.setRoleList(roleList);
      this.setPermList(perms);
      return userInfo;
    },
    /**
     * @description: logout
     */
    async logout(goLogin = true) {
      try {
        await logoutApi();
      } catch {
        console.log('注销Token失败');
      }
      this.setToken(undefined);
      this.setSessionTimeout(false);
      goLogin && router.push(PageEnum.BASE_LOGIN);
    },

    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage();
      const { t } = useI18n();
      createConfirm({
        iconType: 'warning',
        title: t('sys.app.logoutTip'),
        content: t('sys.app.logoutMessage'),
        onOk: async () => {
          await this.logout(true);
        },
      });
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
