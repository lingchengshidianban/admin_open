import req from '@/utils/request.js'

export const courseApi = {
  // 专区分页
  getCourseList: (params) => {
    return req.post('/course/admin/zone/page', params)
  },
  // 专区删除
  getDeleteList: (data) => {
    return req.delete('/course/admin/zone/delete?id=' + data.id)
  }
  // getCourseList: (data) => {}
}
