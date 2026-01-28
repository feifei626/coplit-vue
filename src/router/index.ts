/**
 * Vue Router 配置
 */

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import loginRoutes from '@/pages/login/index'
import Home from '@/pages/Home.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
    meta: {
      title: '首页',
      requiresAuth: false,
    },
  },
  ...loginRoutes,
  {
    path: '/:pathMatch(.*)*',
    redirect: '/home',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 路由前置守卫
router.beforeEach((to, from, next) => {
  // 可以添加权限检查逻辑
  next()
})

export default router

