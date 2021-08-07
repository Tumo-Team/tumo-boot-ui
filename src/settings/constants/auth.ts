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

  system: {
    log: {
      delete: 'system:log:delete',
    },
    oss: {
      add: 'system:oss:add',
      update: 'system:oss:update',
      delete: 'system:oss:delete',
    },
    token: {
      info: 'system:token:info',
      delete: 'system:token:delete',
    },
    dict: {
      add: 'system:dict:add',
      update: 'system:dict:update',
      delete: 'system:dict:delete',
    },
  },
};

export default Auth;
