import SimpleUploader from 'simple-uploader.js'

export const getSimpleClient = (userData) => {
  const simpleClient = new SimpleUploader({
    target: userData.uploadUrl,
    chunkSize: '2048000', // 分片大小，单位bytes，这里为2m
    simultaneousUploads: 5,
    maxChunkRetries: 3,
    progressCallbacksInterval: 1000,
    testChunks: true,
    checkChunkUploadedByResponse: function (chunk, message) {
      try {
        const objMessage = JSON.parse(message)
        return objMessage.code === 200 && objMessage.data?.uploadStatusId === 2
      } catch (error) {
        console.log(error)
        return false
      }
    },
    query: {
      isChunk: true,
      ...userData
    }
  })
  return simpleClient
}

export const uploadSimple = (simpleClient, startFile, callback) => {
  simpleClient.on('fileAdded', function (file) {
    startFile.status = 'uploading'
    callback('FileStarted', file)
  })
  simpleClient.on('fileProgress', function (rootFile, file, chunk) {
    const uploadInfo = {
      progress: file.progress()
    }
    callback('FileProgress', uploadInfo)
  })
  simpleClient.on('fileSuccess', function (rootFile, file, message, chunk) {
    const uploadInfo = {
      vid: JSON.parse(message).data.videoVid
    }
    callback('FileSuccess', uploadInfo)
  })
  simpleClient.on('fileError', function (rootFile, file, message) {
    callback('FileError', message)
  })
  simpleClient.addFile(startFile.file)
  simpleClient.upload()
}
