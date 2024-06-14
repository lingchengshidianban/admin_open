import { createRouter, createWebHashHistory } from 'vue-router'
import { PATH } from '@/utils/constants/system.js'
import Layout from '@/layout/index.vue'
import { getToken } from '@/utils/cookie.js'
import { useUserStore } from '@/stores/modules/user.js'

// 静态路由
const constantRoutes = [
  {
    path: '/',
    redirect: PATH.URL_DASHBOARD
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
const createRouters = (routerList) =>
  createRouter({
    history: createWebHashHistory(),
    routes: routerList,
    strict: true
  })
const router = createRouters(constantRoutes)
// 路由守卫
router.beforeEach((to, from, next) => {
  // to 表示切到的路由 from 表示离开路由 next() 表示执行下一个钩子
  const token = getToken()
  if (!token) {
    if (to.path === PATH.URL_LOGIN) {
      next()
      return
    }
    next(PATH.URL_LOGIN)
    return
  }
  if (to.path === PATH.URL_403) {
    next(PATH.URL_403)
    return
  }
  if (to.path === PATH.URL_404) {
    next(PATH.URL_404)
    return
  }
  next()
})
export default router

export function createNewRouter(data) {
  // 获取路由数据
  // 如果有数据，则直接使用，否则使用store里的数据，确保里面有一个空的数据
  data = data ? data : useUserStore().routerList || []
  const routerList = [] // 定义一个空数组存储路由数据
  const menuList = data.filter((e) => e.path) // 筛选接口里的path
  const modules = import.meta.glob('../views/**/*.vue')
  for (const e of menuList) {
    const route = {
      path: e.path,
      name: e.id.toString(),
      meta: {
        title: e.menuName,
        icon: e.menuIcon,
        id: e.id.toString(),
        path: e.path
      },
      component: {}
    }
    route.component = modules[`../views${e.component}`]
    routerList.push(route)
  }
  router.addRoute({
    path: '/',
    meta: {},
    component: Layout,
    children: routerList
  })
}
