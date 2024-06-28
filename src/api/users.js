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
  teacherSave: (params) => {
    return req.post('/user/admin/lecturer/save', params)
  },
  // 讲师修改
  teacherUpdate: (params) => {
    return req.put('/user/admin/lecturer/edit', params)
  },
  // 讲师排序
  teacherSort: (params) => {
    return req.put('/user/admin/lecturer/sort', params)
  },
  // 讲师删除
  teacherDelete: (data) => {
    return req.delete('/user/admin/lecturer/delete?id=' + data.id)
  },
  // 讲师查看
  teacherInfo: (data) => {
    return req.get('/user/admin/lecturer/view?id=' + data.id)
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
  // 用户删除
  userDelete: (data) => {
    return req.delete('/user/admin/users/delete?id=' + data.id)
  },
  // 用户查看
  userInfo: (data) => {
    return req.get('/user/admin/users/view?id=' + data.id)
  },
  // 用户信息添加
  userSave: (params) => {
    return req.post('/user/admin/users/account/save', params)
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
  loginLogPage: (data) => {
    return req.post('/user/admin/users/log/page', data)
  },
  // 用户账号金额消费记录
  usersAccountConsumePage: (data) => {
    return req.post('/user/admin/users/account/consume/page', data)
  },
  // 用户账号金额消费记录添加
  usersAccountConsumeSave: (data) => {
    return req.post('/user/admin/users/account/consume/save', data)
  }
}
