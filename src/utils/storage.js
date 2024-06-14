/**
 * @description 本地存储
 */

export function localStorage() {
  return {
    set(key, value) {
      localStorage.setItem(key, value)
    },
    get(key) {
      return localStorage.getItem(key)
    },
    remove(key) {
      localStorage.removeItem(key)
    },
    clear() {
      localStorage.clear()
    }
  }
}

/**
 * 设置setSessionStorage
 */
export function setSessionStorage(name, content, expireTime) {
  if (!name) return
  let params = JSON.stringify(content)
  if (expireTime) {
    expireTime = Date.now() + expireTime * 1000 * 60
    // 转换成字符串
    params = JSON.stringify({ content: content, expireTime: expireTime })
  }
  window.sessionStorage.setItem(name, params)
}

/**
 * 获取sessionStorage
 */
export function getSessionStorage(name) {
  if (!name) return null
  let data = window.sessionStorage.getItem(name)
  if (!data) return null
  // 将data 转换成对象
  data = JSON.parse(data)
  if (data) {
    if (data.expireTime && data.expireTime > 0) {
      if (data.expireTime > Date.now()) {
        return data.content
      }
      window.sessionStorage.removeItem(name)
      return null
    }
    return data
  }
  return null
}
