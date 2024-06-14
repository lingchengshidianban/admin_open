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
  }
}
