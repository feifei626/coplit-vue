/**
 * Vue Router 配置
 */

import { createRouter, createWebHistory } from 'vue-router';
import loginRoutes from '@/pages/login/index.js';

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  ...loginRoutes,
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由前置守卫
router.beforeEach((to, from, next) => {
  // 可以添加权限检查逻辑
  next();
});

export default router;
