import req from '@/utils/request.js'

export const loginApi = {
  // 网站基本信息
  getWebsite: () => {
    return req.get('/system/api/sys/config/website')
  },
  // 获取图片验证码
  getCodeImg: () => {
    return req.get('/system/api/common/code')
  },
  // 用户使用密码登录
  getLogin: (params) => {
    return req.post('/system/admin/login/password', params)
  },
  // 获取当前登录用户
  getUserInfo: () => {
    return req.get('/system/admin/sys/user/current')
  }
}
