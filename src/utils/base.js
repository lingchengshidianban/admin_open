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

function toObj(attr) {
  const obj = {}
  if (attr) {
    for (let i = 0; i < attr.length; i++) {
      obj[attr[i].code] = attr[i].desc
    }
  }
  return obj
}
