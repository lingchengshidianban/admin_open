import req from '@/utils/request.js'

export const usersApi = {
  // 订单信息分页
  orderInfoPage: (params, pageSize = 20, pageCurrent = 1) => {
    return req.post('/user/admin/order/info/page', { ...params, pageSize, pageCurrent })
  }
}
