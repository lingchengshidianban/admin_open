import { createRouter, createWebHistory } from 'vue-router'
import { PATH } from '@/utils/constants/system.js'

// 静态路由
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: PATH.URL_LOGIN
    },
    {
      path: PATH.URL_LOGIN,
      component: () => import('@/views/login/index.vue')
    },
    {
      path: PATH.URL_403,
      component: () => import('@/views/403.vue'),
      meta: {
        title: '403'
      }
    },
    {
      path: PATH.URL_404,
      component: () => import('@/views/404.vue'),
      meta: {
        title: '403'
      }
    }
  ]
})

export default router
