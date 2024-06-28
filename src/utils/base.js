import JSEncrypt from 'jsencrypt'
import { useWebsiteStore } from '@/stores/modules/website.js'
import { getSessionStorage, setSessionStorage } from '@/utils/storage.js'
import { SystemApi } from '@/api/system.js'

// 密码加密
export function encrypt(password, publicKey) {
  if (!publicKey) {
    publicKey = useWebsiteStore().getWebsite.rsaLoginPublicKey
    console.log(publicKey)
  }
  const crypt = new JSEncrypt()
  crypt.setPublicKey(publicKey)
  return crypt.encrypt(password)
}

/**
 * 枚举
 */
export const getEnumList = async (enumName) => {
  // 先从sessionStorage中获取
  const enumMap = getSessionStorage(enumName)
  // 如果有则直接返回
  if (enumMap) {
    return enumMap
  }
  // 否则从后端获取
  const res = await SystemApi.getEnum({ enumName })
  // 将枚举存储到setSessionStorage
  setSessionStorage(enumName, res)
  return getSessionStorage(enumName)
}

export async function getEnumObj(enumName) {
  let res = await getEnumList(enumName)
  return toObj(res)
}

/**
 * 格式化时间
 */

export function formatTime(time) {
  let a = ~~(time / 3600)
  let b = ~~(time / 60) - a * 60
  let c = time & 60
  a = String(a).padStart(2, '0')
  b = String(b).padStart(2, '0')
  c = String(c).padStart(2, '0')
  if (a === '00') {
    return `${b}:${c}`
  } else {
    return `${a}:${b}:${c}`
  }
}
/**
 * 文件大小转换
 */
export function transformSize(bytes) {
  const bt = parseInt(bytes)
  let result
  if (bt === 0) {
    return '0B'
  } else if (bt < 1024) {
    result = bt + 'B'
  } else if (bt < 1024 * 1024) {
    result = (bt / 1024).toFixed(2) + 'KB'
  } else if (bt < 1024 * 1024 * 1024) {
    result = (bt / (1024 * 1024)).toFixed(2) + 'MB'
  } else {
    result = (bt / (1024 * 1024 * 1024)).toFixed()
  }
  return result
}

function toObj(attr) {
  const obj = {}
  if (attr) {
    for (let i = 0; i < attr.length; i++) {
      obj[attr[i].code] = attr[i].desc
    }
  }
  return obj
}
