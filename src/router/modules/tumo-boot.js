/** 本系统涉及的页面路由地址 **/

import Layout from '@/layout'

const tumoBootRouter = [
  {
    path: '/system',
    component: Layout,
    name: '权限模块',
    meta: {
      title: '权限模块',
      icon: 'safety-certificate'
    },
    children: [
      {
        path: 'user',
        name: '用户管理',
        component: () => import('@/views/modules/upms/user/index'),
        meta: { title: '用户管理', icon: 'user' }
      },
      {
        path: 'role',
        name: '角色管理',
        component: () => import('@/views/modules/upms/user/index'),
        meta: { title: '角色管理', icon: 'audit' }
      },
      {
        path: 'dept',
        name: '部门管理',
        component: () => import('@/views/modules/upms/user/index'),
        meta: { title: '部门管理', icon: 'apartment' }
      },
      {
        path: 'menu',
        name: '菜单管理',
        component: () => import('@/views/modules/upms/user/index'),
        meta: { title: '菜单管理', icon: 'cluster' }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    name: '系统模块',
    meta: {
      title: '系统模块',
      icon: 'setting'
    },
    children: [
      {
        path: 'doc',
        name: 'Api文档',
        component: () => import('@/views/modules/upms/user/index'),
        meta: { title: 'Api文档', icon: 'file-search' }
      },
      {
        path: 'log',
        name: '日志管理',
        component: () => import('@/views/modules/upms/user/index'),
        meta: { title: '日志管理', icon: 'exception' }
      }
    ]
  }
]

export default tumoBootRouter
