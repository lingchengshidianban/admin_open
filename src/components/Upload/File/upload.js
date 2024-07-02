import { ElMessage } from 'element-plus'
import { getPolyvClient, uploadPolyv } from '@/utils/vod/poly.js'
import { uploadApi } from '@/api/upload.js'
import bus from '@/utils/bus.js'
import { getSimpleClient, uploadSimple } from '@/utils/vod/simple.js'
import { getSessionStorage, setSessionStorage } from '@/utils/storage.js'
import { useUploadStore } from '@/stores/modules/upload.js'

// 接受 startFile
export const handleVod = async (startFile) => {
  const res = await getVodConfig()
  if (res.vodPlatform === 1) {
    const simpleClient = getSimpleClient(JSON.parse(res.vodUploadConfig))
    uploadSimple(simpleClient, startFile, (type, data) => {
      if (type === 'FileProgress') {
        // 如果当前状态为文件进度，使用parseInt将data.progress小数转换为整数，并赋值给startFile.progress
        startFile.progress = parseInt(String(data.progress * 100))
      }
      if (type === 'FileSuccess') {
        // 调用saveResource函数，传入startFile，将回调函数作为参数
        startFile.videoVid = data.vid
        saveResource(startFile).then(() => {
          startFile.status = 'success'
          useUploadStore().addSuccessFile(startFile)
        })
      } else if (type === 'FileFailed') {
        startFile.status = 'fail'
        ElMessage.error('上传失败,请重试')
      }
    })
  } else if (res.vodPlatform === 2) {
    const polyvClient = getPolyvClient(JSON.parse(res.vodUploadConfig))
    uploadPolyv(polyvClient, startFile, (type, data) => {
      if (type === 'FileProgress') {
        startFile.progress = parseInt(String(data.progress * 100))
      }
      if (type === 'FileSucceed') {
        startFile.videoVid = data.fileData.vid
        saveResource(startFile).then(() => {
          startFile.status = 'success'
          useUploadStore().addSuccessFile(startFile)
        })
      } else if (type === 'FileFailed') {
        startFile.status = 'fail'
        ElMessage.error('上传失败,请重试')
      }
    })
  } else {
    ElMessage.error('暂不支持该平台：' + res.vodPlatform)
  }
}

// 图片上传
export const handlePic = async (startFile) => {
  startFile.status = 'uploading'
  try {
    startFile.resourceUrl = await uploadApi.pic(startFile.file)
    await handleWidthHeight(startFile)
    await saveResource(startFile)
    startFile.status = 'success'
    useUploadStore().addSuccessFile(startFile)
  } catch (e) {
    startFile.status = 'fail'
  }
}

// 文件，压缩包上传
export const handleFile = async (startFile) => {
  startFile.status = 'uploading'
  try {
    const res = await uploadApi.doc(
      startFile.file,
      (p) => {
        startFile.progress = p
        startFile.status = 'uploading'
      },
      startFile.cancelToken
    )
    startFile.storagePlatform = res.storagePlatform
    startFile.resourceUrl = res.docUrl
    startFile.docPage = res.pageCount
    await saveResource(startFile)
    startFile.status = 'success'
    useUploadStore().addSuccessFile(startFile)
  } catch (e) {
    startFile.status = 'fail'
  }
}

// 保存资源
const saveResource = async (data) => {
  await uploadApi.saveResource({
    categoryId: data.categoryId,
    resourceType: data.resourceType,
    resourceName: data.fileName,
    resourceSize: data.fileSize,
    resourceUrl: data.resourceUrl,
    vodPlatform: data.vodPlatform,
    storagePlatform: data.storagePlatform,
    videoVid: data.videoVid,
    docPage: data.docPage,
    imgWidth: data.imgWidth,
    imgHeight: data.imgHeight
  })
  ElMessage.success('上传成功')
  bus.emit('upload-event')
}

// 获取vod配置
const getVodConfig = async () => {
  let res = getSessionStorage('vodConfig')
  if (!res) {
    res = await uploadApi.vodConfig()
    setSessionStorage('vodConfig', res, 2)
    return res
  }
  return res
}

const handleWidthHeight = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(file.file)
    reader.onload = function () {
      const img = new Image()
      img.src = reader.result
      if (img.complete) {
        file.imgWidth = img.width
        file.imgHeight = img.height
      } else {
        img.onload = function () {
          file.imgWidth = img.width
          file.imgHeight = img.height
          resolve(file)
        }
      }
    }
  })
}

export const STATUS = {
  ready: '准备',
  doing: '待上传',
  uploading: '上传中',
  stop: '暂停',
  success: '成功',
  fail: '失败'
}
