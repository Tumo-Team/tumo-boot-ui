import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';
import { AppRouteRecordRaw } from '/@/router/types';

const profile: AppRouteRecordRaw = {
  path: '/profile',
  name: 'Profile',
  component: LAYOUT,
  meta: {
    title: t('routes.basic.profile'),
    hideBreadcrumb: true,
  },
  children: [
    {
      path: 'setting',
      name: 'profileSetting',
      component: () => import('/@/views/sys/setting/index.vue'),
      meta: {
        title: t('routes.basic.profile'),
        hideBreadcrumb: true,
      },
    },
  ],
};

export default profile;
