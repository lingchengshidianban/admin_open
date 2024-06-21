import req from '@/utils/request.js'

export const usersApi = {
  // 订单信息分页
  orderInfoPage: (params, pageSize = 20, pageCurrent = 1) => {
    return req.post('/user/admin/order/info/page', { ...params, pageSize, pageCurrent })
  },

  // 讲师分页
  teacherPage: (params, pageSize = 20, pageCurrent = 1) => {
    return req.post('/user/admin/lecturer/page', { ...params, pageSize, pageCurrent })
  },
  // 讲师添加
  teacherAdd: (params) => {
    return req.post('/user/admin/lecturer/add', params)
  },
  // 讲师修改
  teacherUpdate: (params) => {
    return req.post('/user/admin/lecturer/update', params)
  },
  // 讲师删除
  teacherDelete: (data) => {
    return req.post('/user/admin/lecturer/delete?id=', data.id)
  },
  // 讲师查看
  teacherInfo: (params) => {
    return req.post('/user/admin/lecturer/info', params)
  },
  // 讲师ES同步
  teacherEsSync: (params) => {
    return req.get('/user/admin/lecturer/es', params)
  },
  // 用户分页
  userPage: (params, pageSize = 20, pageCurrent = 1) => {
    return req.post('/user/admin/users/page', { ...params, pageSize, pageCurrent })
  },
  // 用户修改
  userEdit: (params) => {
    return req.put('/user/admin/users/edit', params)
  },
  // 用户查看
  userInfo: (data) => {
    return req.get('/user/admin/users/view?id=' + data.id)
  },
  //订单统计
  orderStatistics: (data) => {
    return req.get('/user/admin/order/info/stat?userId=' + data.userId)
  },
  // 学习统计
  studyStatistics: (data) => {
    return req.get('/course/admin/user/study/stat?userId=' + data.userId)
  },
  // 订单分页
  orderPage: (params, pageSize = 20, pageCurrent = 1) => {
    return req.post('/user/admin/order/info/page', { ...params, pageSize, pageCurrent })
  },
  //登录日志
  loginLogPage: (params, pageSize = 20, pageCurrent = 1) => {
    return req.post('/user/admin/users/log/page', { ...params, pageSize, pageCurrent })
  }
}
