import req from '@/utils/request.js'

export const SystemApi = {
  // 枚举
  getEnum: (data) => {
    return req.post('/system/api/common/enum', data)
  },
  // 轮播分页
  carouselPage: (data, pageSize = 20, pageCurrent = 1) => {
    return req.post('/system/admin/website/carousel/page', { pageCurrent, pageSize, ...data })
  },
  // 轮播删除
  carouselDelete: (data) => {
    return req.delete('/system/admin/website/carousel/delete?id=', data.id)
  },
  // 轮播修改
  carouselEdit: (data) => {
    return req.put('/system/admin/website/carousel/edit', data)
  },
  // 头部导航分页
  getHeaderPage: (data, pageSize = 20, pageCurrent = 1) => {
    return req.post('/system/admin/website/nav/page', { pageCurrent, pageSize, ...data })
  },
  // 头部导航删除
  getHeaderDelete: (data) => {
    return req.delete('/system/admin/website/nav/delete?id=', data.id)
  },
  // 头部导航修改
  getHeaderEdit: (data) => {
    return req.put('/system/admin/website/nav/edit', data)
  },
  // 头部导航添加
  getHeaderAdd: (data) => {
    return req.post('/system/admin/website/nav/save', data)
  },
  // 友情分页
  getFriendPage: (data, pageSize = 20, pageCurrent = 1) => {
    return req.post('/system/admin/website/link/page', { pageCurrent, pageSize, ...data })
  },
  // 友情删除
  getFriendDelete: (data) => {
    return req.delete('/system/admin/website/link/delete?id=', data.id)
  },
  // 友情修改
  getFriendEdit: (data) => {
    return req.put('/system/admin/website/link/edit', data)
  },
  // 友情添加
  getFriendAdd: (data) => {
    return req.post('/system/admin/website/link/save', data)
  },
  // 系统配置--列出
  sysConfigList: (data, configType = 1) => {
    return req.post('/system/admin/sys/config/list', { configType, ...data })
  },
  // 系统配置--修改
  sysConfigEdit: (data) => {
    return req.put('/system/admin/sys/config/edit', data)
  },
  // 系统配置添加
  sysConfigAdd: (data) => {
    return req.post('/system/admin/sys/config/save', data)
  },
  // 视频点播地址
  getVideoUrl: (data) => {
    return req.get('/system/admin/sys/config/video/config', data)
  },
  // 视频云初始化设置
  getVideoInit: (data) => {
    return req.get('/system/admin/sys/config/video/init', data)
  },
  // app版本管理分页
  getAppVersionPage: (data, pageSize = 20, pageCurrent = 1) => {
    return req.post('/system/admin/website/app/page', { pageCurrent, pageSize, ...data })
  },
  // app版本管理删除
  getAppVersionDelete: (data) => {
    return req.delete('/system/admin/website/app/delete?id=', data.id)
  },
  // app版本管理修改
  getAppVersionEdit: (data) => {
    return req.put('/system/admin/website/app/edit', data)
  },
  // app版本管理添加
  getAppVersionAdd: (data) => {
    return req.post('/system/admin/website/app/edit', data)
  }
}
