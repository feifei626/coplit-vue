/**
 * 登录模块路由配置
 */

import type { RouteRecordRaw } from 'vue-router'
import AuthContainer from '@/pages/AuthContainer.vue'
import ForgotPassword from './ForgotPassword.vue'

export const loginRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: AuthContainer,
    meta: {
      title: '登录/注册',
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

