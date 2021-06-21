/**
 * 定义按钮级权限标识
 */
const Auth = {
  upms: {
    user: {
      add: 'upms:user:add',
      update: 'upms:user:update',
      delete: 'upms:user:delete',
    },
    role: {
      add: 'upms:role:add',
      update: 'upms:role:update',
      delete: 'upms:role:delete',
    },
    dept: {
      add: 'upms:dept:add',
      update: 'upms:dept:update',
      delete: 'upms:dept:delete',
    },
    menu: {
      add: 'upms:menu:add',
      update: 'upms:menu:update',
      delete: 'upms:menu:delete',
    },
  },

  resource: {
    log: {
      delete: 'resource:log:delete',
    },
    oss: {
      add: 'resource:oss:add',
      update: 'resource:oss:update',
      delete: 'resource:oss:delete',
    },
    token: {
      info: 'resource:token:info',
      delete: 'resource:token:delete',
    },
  },
};

export default Auth;
