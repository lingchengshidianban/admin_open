import PlvVideoUpload from '@polyv/vod-upload-js-sdk'

export const getPolyvClient = (userData) => {
  const polyvClient = new PlvVideoUpload({
    region: 'auto', // auto：自动选择。根据IP的地区自动选择，当IP解析不出时使用默认值。
    events: {
      Error: (err) => {
        console.log(err)
      },
      UploadComplete: () => {
        // 全部上传任务完成回调
      }
    }
  })
  // 设置账号授权验证信息
  polyvClient.updateUserData({
    userId: userData.userId,
    ptime: userData.ptime,
    hash: userData.hash,
    cataid: userData.categoryId
  })
  return polyvClient
}

export const uploadPolyv = (polyvClient, startFile, callback) => {
  polyvClient.addFile(
    startFile.File,
    {
      // 文件开始上传回调
      FileStarted: function (uploadInfo) {
        startFile.status = 'uploading'
        callback('FileStarted', uploadInfo)
      },
      // 上传进度回调
      FileProgress: function (uploadInfo) {
        console.log('FileProgress', uploadInfo)
      },
      // 文件暂停上传回调
      FileStopped: function (uploadInfo) {
        console.log('FileStopped', uploadInfo)
      },
      // 文件成功上传回调
      FileComplete: function (uploadInfo) {
        console.log('FileComplete', uploadInfo)
      },
      FileFailed: function (uploadInfo) {
        // 文件上传失败回调
        console.log('FileFailed', uploadInfo)
      }
    },
    {
      catail: startFile.categoryId, // 上传分类目录ID
      luping: 1, // 是否开启视频课件优化处理，对于上传录屏类视频清晰度有所优化：0为不开启，1为开启
      keepsource: 0 // 是否源文件播放（不对视频进行编码）：0为编码，1为不编码
    }
  )
  polyvClient.startAll()
}
