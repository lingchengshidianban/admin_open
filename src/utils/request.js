import axios from 'axios'
import { PATH } from '@/utils/constants/system.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getToken, removeToken } from '@/utils/cookie.js'
import router from '@/router/index.js'

const pending = []
const cancelToken = axios.CancelToken

const request = axios.create({
  baseURL: PATH.URL_GATEWAY,
  timeout: 60000
})

// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    // removePending(config, true)
    const token = getToken()
    if (token) {
      config.headers['token'] = token
    }
    config.cancelToken = new cancelToken((c) => {
      // 这里的ajax标识用：请求地址&请求方式拼接的字符串
      pending.push({ u: config.url + '&' + config.method, f: c })
    })
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    // removePopper()
    removePending(
      {
        url: response.config.url ? response.config.url.replace(PATH.URL_GATEWAY, '') : '',
        method: response.config.method
      },
      false
    )
    const res = response.data
    if (res.code === 200) {
      return Promise.resolve(res.data)
    }
    if (res.code === 301) {
      // token过期
      removeToken()
      router.push(PATH.URL_LOGIN).then(() => {
        ElMessage.error('登录已过期，请重新登录')
        // 重新实例化vue-router对象
        location.reload()
      })
      return Promise.reject(response)
    }
    if (res.code === 302 || res.code === 303 || res.code === 304 || res.code === 305) {
      // 302token异常，303登录异常，304异地登录，305菜单过期
      ElMessageBox.confirm('提示', '确定登出', {
        confirmButtonText: res.mes,
        showConfirmButton: false,
        type: 'warning'
      }).then(() => {
        removeToken()
        // 重新实例化vue-router对象
        location.reload()
      })
      return Promise.resolve(response)
    }
    if (res.code === 306) {
      // 权限不足
      router.push({ path: PATH.URL_403 }).then(() => {
        ElMessage.error('权限不足,请联系管理员')
      })
      return Promise.reject(response)
    }
    // 其他异常
    console.log(response)
    ElMessage.error({ message: res.msg, duration: 5 * 1000 })
    return Promise.reject(response)
  },
  (error) => {
    if (error.response && error.response.status === 500 && error.response.data.msg) {
      ElMessage.error({ message: error.response.data.msg, duration: 5 * 1000 })
    } else {
      console.error(error)
    }
    return Promise.reject(error)
  }
)
// 取消请求
const removePending = (config, isCancel) => {
  for (const p in pending) {
    if (config.url.indexOf('enum') === -1) {
      if (pending[p].u === config.url + '&' + config.method) {
        if (isCancel) {
          pending[p].f()
        }
        pending.splice(Number(p), 1)
      }
    }
  }
}

const createHttp = {
  // post请求
  post: (url, params) => {
    return request({
      url: url,
      data: params,
      method: 'post'
    })
  },
  // get 请求
  get: (url) => {
    return request({
      url: url,
      method: 'get'
    })
  },
  ///  put请求
  put: (url, params) => {
    return request({
      url: url,
      data: params,
      method: 'put'
    })
  },
  // delete请求
  delete: (url) => {
    return request({
      url: url,
      method: 'delete'
    })
  }
}

export default createHttp
