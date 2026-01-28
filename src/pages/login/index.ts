/**
 * 登录模块路由配置
 */

import type { RouteRecordRaw } from 'vue-router'
import Login from './Login.vue'
import Register from './Register.vue'
import ForgotPassword from './ForgotPassword.vue'

export const loginRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: Login,
    meta: {
      title: '登录',
      requiresAuth: false,
    },
  },
  {
    path: '/login/register',
    component: Register,
    meta: {
      title: '注册',
      requiresAuth: false,
    },
  },
  {
    path: '/login/forgot-password',
    component: ForgotPassword,
    meta: {
      title: '重置密码',
      requiresAuth: false,
    },
  },
]

export default loginRoutes

