// 上传
import req, { upload } from '@/utils/request.js'
export const uploadApi = {
  // 上传APP
  app: (file, cb, cancelFun) => {
    return upload('/system/admin/upload/app?name=' + file.name, file, 'appFile', cb, cancelFun)
  },
  // 上传图片
  pic: (file) => {
    return upload('/system/admin/upload/pic?name=' + file.name, file, 'picFile')
  },
  // 上传文档
  doc: (file, cb, cancelFun) => {
    return upload('/system/admin/upload/doc?name=' + file.name, file, 'docFile', cb, cancelFun)
  },
  //获取上传音视频参数
  vodConfig: () => {
    return req.get('/course/admin/resource/vod/config?t' + Date.now())
  },
  // 课程视频信息添加
  saveResource: (data) => {
    return req.post('/course/admin/resource/save?t=' + Date.now(), data)
  }
}
