import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import '@/assets/styles/index.scss'
import 'element-plus/dist/index.css'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router, { createNewRouter } from './router'
import { getToken } from '@/utils/cookie.js'
import Icon from '@/components/Icon/index.vue'
import { loginApi } from '@/api/login.js'
import { useUserStore } from '@/stores/modules/user.js'
import 'virtual:svg-icons-register'
import { hasPermission } from '@/utils/permission.js'

setupInit()

async function setupInit() {
  if (!getToken()) {
    init()
  } else {
    const res = await loginApi.getUserInfo()
    createNewRouter(res.routerList)
    init()
    useUserStore().login(res)
  }
}

function init() {
  const app = createApp(App)
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  app.component('Icon', Icon)

  // 自定义指令
  app.directive('permission', (el, binding) => {
    if (!hasPermission(binding.value)) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  })
  app.use(createPinia())
  app.use(router)
  app.use(ElementPlus)
  app.mount('#app')
}
