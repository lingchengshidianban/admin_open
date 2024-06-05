import { createRouter, createWebHistory } from 'vue-router'
import { PATH } from '@/utils/constants/system.js'
import { getToken } from '@/utils/cookie'

// 静态路由
const constantRoutes = [
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
const createRouters = (routerList) => {
  createRouter({
    history: createWebHistory(),
    routes: routerList,
    strict: true
  })
}
const router = createRouters(constantRoutes)
// 路由守卫 加载前
router.beforeEach((to, from, next) => {
  if (to.path === PATH.URL_LOGIN) {
    next()
  } else {
    if (getToken()) {
      next()
    } else {
      next({ path: PATH.URL_LOGIN })
    }
  }
})

export default router
