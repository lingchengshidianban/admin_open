import req from '@/utils/request.js'

export const statApi = {
  // 数据统计
  data: () => {
    return req.get('/user/admin/stat/data')
  },
  // 登录统计
  login: () => {
    return req.get('/user/admin/stat/login?dates=-14')
  },
  // 播放统计
  vod: () => {
    return req.get('/system/admin/stat/vod')
  }
}
