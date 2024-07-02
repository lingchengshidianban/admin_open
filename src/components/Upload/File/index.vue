<template>
  <!--    :show-file-list="true"是否显示已上传列表-->
  <el-upload ref="upload" :before-upload="beforeUpload" :http-request="onUpload" :show-file-list="false" :multiple="true">
    <el-button type="primary">上传</el-button>
  </el-upload>
</template>

<script setup>
import { toRefs, watch } from 'vue'
import { ElMessage } from 'element-plus'
import bus from '@/utils/bus.js'
import { useUploadStore } from '@/stores/modules/upload.js'

const props = defineProps({
  onBus: { type: Boolean, default: false },
  categoryId: { type: String, default: '' }
})

const { onBus } = toRefs(props)
const emit = defineEmits(['refresh'])
const refresh = () => {
  emit('refresh')
}

watch(
  () => onBus.value,
  (val) => {
    if (val) {
      bus.on('upload-event', refresh)
    } else {
      bus.off('upload-event', refresh)
    }
  },
  {
    immediate: true
  }
)

// 上传
const onUpload = (file) => {
  // 初始化
  const upload = {
    categoryId: props.categoryId,
    file: file.file,
    fileName: file.file.name,
    fileSize: file.file.size,
    uid: file.file.uid,
    status: 'ready',
    progress: 0
  }
  // 资源部类型：1视频 2音频 3文档 4图片 5压缩包
  if (vodType.indexOf(file.file.type) > -1) {
    upload.ressourceType = 1
  } else if (audioType.indexOf(file.file.type) > -1) {
    upload.ressourceType = 2
  } else if (docType.indexOf(file.file.type) > -1) {
    upload.ressourceType = 3
  } else if (imageType.indexOf(file.file.type) > -1) {
    upload.ressourceType = 4
  } else if (zipType.indexOf(file.file.type) > -1) {
    upload.ressourceType = 5
  } else {
    ElMessage.error('暂不支持该文件类型', file.file.type)
    return false
  }
  useUploadStore().addFile(upload)
}
// 文件类型设置
const vodType = 'video/mp4,video/avi'
const audioType = 'audio/mpeg,audio/mp3,audio/mp4'
const docType =
  'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/x-xls,text/plain'
const imageType = 'image/jpeg,image/png,image/gif,image/x-icon'
const zipType = 'application/zip,application/gzip,application/x-zip-compressed'

const beforeUpload = (file) => {
  if (!file) {
    return false
  }
  return true
}
</script>

<style scoped lang="scss">
.el-button {
  margin-left: 10px;
}
</style>
