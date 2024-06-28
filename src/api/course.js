import req from '@/utils/request.js'

export const courseApi = {
  //专区课程关联表分页
  courseZoneList: (params) => {
    return req.post('/course/admin/zone/course/page', params)
  },
  // 专区课程关联表修改
  courseZoneEdit: (data) => {
    return req.put('/course/admin/zone/course/edit', data)
  },
  // 专区课程关联表删除
  courseZoneDelete: (data) => {
    return req.delete('/course/admin/zone/course/delete?id=' + data.id)
  },
  // 专区课程关联表排序
  courseZoneSort: (data) => {
    return req.put('/course/admin/zone/course/sort', data)
  },
  // 专区分页
  zoneList: (params) => {
    return req.post('/course/admin/zone/page', params)
  },
  // 专区删除
  getDeleteList: (data) => {
    return req.delete('/course/admin/zone/delete?id=' + data.id)
  },
  // 专区排序
  zoneSort: (data) => {
    return req.put('/course/admin/zone/sort', data)
  },
  // 课程分页
  coursePage: (params, pageSize = 20, pageCurrent = 1) => {
    return req.post('/course/admin/course/page', { pageCurrent, pageSize, ...params })
  },
  // 同步ES
  courseEs: (params) => {
    return req.get('/course/admin/course/es', params)
  },
  // 课程查看
  courseView: (data) => {
    return req.get('/course/admin/course/view?id=' + data.id)
  },
  // 课程删除
  courseDelete: (data) => {
    return req.delete('/course/admin/course/delete?id=' + data.id)
  },
  // 课程修改
  courseEdit: (data) => {
    return req.put('/course/admin/course/edit', data)
  },
  // 课程排序
  courseSort: (data) => {
    return req.put('/course/admin/course/sort', data)
  },
  // 课程添加
  courseSave: (data) => {
    return req.post('/course/admin/course/save', data)
  },
  //分类列表
  categoryList: (data) => {
    return req.post('/course/admin/category/list', data)
  },
  // 分类修改
  categoryEdit: (data) => {
    return req.put('/course/admin/category/edit', data)
  },
  // 分类删除
  categoryDelete: (data) => {
    return req.delete('/course/admin/category/delete?id=' + data.id)
  },
  // 分类添加
  categorySave: (data) => {
    return req.post('/course/admin/category/save', data)
  },
  // 分类排序
  categorySort: (data) => {
    return req.put('/course/admin/category/save', data)
  },
  // 分类查看
  categoryView: (data) => {
    return req.get('/course/admin/category/save?id=' + data.id)
  },
  // 资源分页
  resourcePage: (params, pageSize = 20, pageCurrent = 1) => {
    return req.post('/course/admin/resource/page', { pageCurrent, pageSize, ...params })
  },
  // 资源修改
  resourceEdit: (data) => {
    return req.put('/course/admin/resource/edit', data)
  },
  //资源删除
  resourceDelete: (data) => {
    return req.delete('/course/admin/resource/delete?id=' + data.id)
  },
  //资源批量移动
  resourceMove: (data) => {
    return req.put('/course/admin/resource/batch/edit', data)
  },
  // 资源批量删除
  resourceDeleteList: (data) => {
    return req.delete('/course/admin/resource/batch/delete', data)
  },
  //资源排序
  resourceSort: (data) => {
    return req.put('/course/admin/resource/sort', data)
  },
  // 资源添加
  resourceSave: (data) => {
    return req.post('/course/admin/resource/save', data)
  },
  //资源预览
  resourcePreview: (data) => {
    return req.get('/course/admin/resource/preview?id=' + data.id)
  },
  // 用户课程记录
  userCourseRecord: (params, pageSize = 20, pageCurrent = 1) => {
    return req.post('/course/admin/user/course/record', { pageCurrent, pageSize, ...params })
  },
  // 用户课程分页
  userCoursePage: (params, pageSize = 20, pageCurrent = 1) => {
    return req.post('/course/admin/user/course/page', { pageCurrent, pageSize, ...params })
  },
  // 资源学习记录分页
  resourceRecordPage: (params, pageSize = 20, pageCurrent = 1) => {
    return req.post('/course/admin/user/study/page', { pageCurrent, pageSize, ...params })
  },
  // 课程评论分页
  courseCommentPage: (params, pageSize = 20, pageCurrent = 1) => {
    return req.post('/course/admin/user/course/comment/page', { pageCurrent, pageSize, ...params })
  },
  // 课程评论修改
  courseCommentEdit: (data) => {
    return req.put('/course/admin/user/course/comment/page', data)
  },
  // 课程评论删除
  courseCommentDelete: (data) => {
    return req.delete('/course/admin/user/course/comment/delete?id=' + data.id)
  },
  //课程收藏分页
  courseCollectPage: (params, pageSize = 20, pageCurrent = 1) => {
    return req.post('/course/admin/user/course/collect/page', { pageCurrent, pageSize, ...params })
  },
  // 课程收藏删除
  courseCollectDelete: (data) => {
    return req.delete('/course/admin/user/course/collect/delete?id=' + data.id)
  },
  // 章节分页
  chapterPage: (params, pageSize = 20, pageCurrent = 1) => {
    return req.post('/course/admin/course/chapter/page', { pageCurrent, pageSize, ...params })
  },
  // 章节排序
  chapterSort: (data) => {
    return req.put('/course/admin/course/chapter/sort', data)
  },
  // 章节列表
  chapterList: (params) => {
    return req.post('/course/admin/course/chapter/list', params)
  },
  // 课时信息列表
  chapterPeriodList: (data) => {
    return req.post('/course/admin/course/chapter/period/list', data)
  },
  // 课时信息删除
  chapterPeriodDelete: (data) => {
    return req.delete('/course/admin/course/chapter/period/delete?id=' + data.id)
  },
  // 课时信息修改
  chapterPeriodEdit: (data) => {
    return req.put('/course/admin/course/chapter/period/edit', data)
  },
  // 课时信息排序
  chapterPeriodSort: (data) => {
    return req.put('/course/admin/course/chapter/period/sort', data)
  },
  // 课时信息添加
  chapterPeriodSave: (data) => {
    return req.post('/course/admin/course/chapter/period/save', data)
  },
  // 直播分页
  livePage: (params, pageSize = 20, pageCurrent = 1) => {
    return req.post('/course/admin/live/page', { pageCurrent, pageSize, ...params })
  },
  //直播删除
  liveDelete: (data) => {
    return req.delete('/course/admin/live/delete?id=' + data.id)
  },
  // 讲师开播地址
  liveUrl: (data) => {
    return req.get('/course/admin/live/broadcast?id=' + data.id)
  },
  // 直播修改
  liveEdit: (data) => {
    return req.put('/course/admin/live/edit', data)
  },
  // 直播添加
  liveSave: (data) => {
    return req.post('/course/admin/live/save', data)
  },
  // 直播查看
  liveView: (data) => {
    return req.get('/course/admin/live/view?id=' + data.id)
  }
}
