import Cookies from 'js-cookie'
import { TOKEN_KEY } from '@/utils/constants/system.js'

/**
 * 单位：天
 */

const TokenExpiresTime = 1
// 设置token时间
export function setToken(token) {
  return Cookies.set(TOKEN_KEY, token, {
    expires: TokenExpiresTime
  })
}

// 请求token
export function getToken() {
  return Cookies.get(TOKEN_KEY)
}
// 清楚token
export function removeToken() {
  return Cookies.remove(TOKEN_KEY, {
    expires: 0 // 过期时间
  })
}
