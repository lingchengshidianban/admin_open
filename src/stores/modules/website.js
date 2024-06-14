import { ref } from 'vue'
import { defineStore } from 'pinia'
import { loginApi } from '@/api/login.js'

export const useWebsiteStore = defineStore('website', () => {
  const website = ref('')
  const getWebsite = () => {
    loginApi.getWebsite().then((res) => {
      website.value = res.data
    })
  }
  const init = () => {
    loginApi.getWebsite().then((res) => {
      website.value = res
    })
  }
  return { website, getWebsite, init }
})
