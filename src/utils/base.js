import JSEncrypt from 'jsencrypt'
import { useWebsiteStore } from '@/stores/modules/website.js'

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
