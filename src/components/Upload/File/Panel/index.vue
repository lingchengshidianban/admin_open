<template>
  <!--  全局上传文件列表-->
  <div v-show="fileList.length > 0" class="fixed_upload_panel">
    <div class="upload_wrapper">
      <div class="upload_title">
        <div style="flex: 1">
          文件列表
          <span>
            (
            <span>{{ successFileList.length }}</span>
            /
            <span>{{ fileList.length }}</span>
            )
          </span>
        </div>
        <div style="cursor: pointer; font-size: 20px; padding: 4px">
          <el-icon v-if="listing === false" title="最大化" @click="listing = true"><FullScreen /></el-icon>
          <el-icon v-else class="ctrl_min_btn" title="最小化" @click="listing = false"><Minus /></el-icon>
          <el-icon title="关闭" @click="handleClosePanel"><Close /></el-icon>
        </div>
      </div>
    </div>
    <div v-show="listing" class="upload_file_list">
      <div v-for="item in fileList" :key="item.uid" class="upload_file_item">
        <div class="file_name">{{ item.fileName }}</div>
        <div class="file_size">{{ transformSize(item.fileSize) }}</div>
        <div class="file_progress_nubBer">{{ item.progress }}%</div>
        <div class="file_status c-brand">{{ STATUS[item.status] }}</div>
        <el-icon v-if="item.status === 'uploading'" class="file_ctrl_btn" @click.stop="stopUpload(item)"><VideoPause /></el-icon>
        <el-icon v-if="item.status === 'fail'" class="file_ctrl_btn" @click.stop="startUpload(item)"><VideoPlay /></el-icon>
        <el-icon v-if="item.status === 'stop'" class="file_ctrl_btn"><VideoPlay /></el-icon>
        <div class="file_progress" :style="{ width: item.progress + '%' }" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useUploadStore } from '@/stores/modules/upload.js'
import { transformSize } from '@/utils/base.js'
import { handleFile, handlePic, handleVod, STATUS } from '@/components/Upload/File/upload.js'
import { ElMessageBox } from 'element-plus'

const fileList = ref([])
const successFileList = ref([])

watch([useUploadStore().getFileList, useUploadStore().getSuccessFileList], (newValue) => {
  fileList.value = newValue[0]
  successFileList.value = newValue[1]
  startUpload()
})

// 状态
const listing = ref(true)

// 上传
const startUpload = (row) => {
  let startFile = row
  if (!startFile) {
    fileList.value.map((item) => {
      if (item.status === 'ready' && !startFile) {
        startFile = item
      }
    })
  }
  if (startFile) {
    listing.value = true
    startFile.status = 'doing'
    if (startFile.ressourceType === 1 || startFile.ressourceType === 2) {
      // console.log()
      handleVod(startFile)
    } else if (startFile.ressourceType === 4) {
      handlePic(startFile)
    } else {
      handleFile(startFile)
    }
  }
}
const stopUpload = (row) => {
  console.log(row)
}

const clear = () => {
  useUploadStore().clearFile()
  useUploadStore().clearSuccessFile()
}
// 关闭
const handleClosePanel = () => {
  let startFile
  fileList.value.map((item) => {
    if (item.status !== 'success') {
      startFile = item
    }
  })
  if (startFile) {
    ElMessageBox.confirm('还在上传中确定要关闭吗？', '文件列表', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      clear()
    })
  } else {
    clear()
  }
}
</script>

<style scoped lang="scss">
.fixed_upload_panel {
  position: fixed;
  right: 10px;
  bottom: 20px;
  z-index: 9990;
  .upload_wrapper {
    width: 540px;
    background-color: #fff;
    box-shadow: -1px -1px 4px #ddd;
    border-radius: 8px 0 0;
    transition: width 0.3s;
    .upload_title {
      display: flex;
      padding: 0 12px;
      line-height: 40px;
      color: #666;
      background-color: #f7f7f7;
      border-bottom: 1px solid #eee;

      .ctrl_min_btn {
        transform: rotateX(180deg);
      }
    }
  }
  .upload_file_list {
    width: 540px;
    max-height: 30vh;
    overflow: auto;
    background-color: #fff;

    .upload_file_item {
      position: relative;
      padding: 0 10px;
      display: flex;
      line-height: 45px;
      border-bottom: 1px solid #dedede;
      font-size: 12px;
      div {
        padding: 0 12px;
        position: relative;
        z-index: 99;
      }
      .file_type {
        padding: 0;
        font-size: 18px;
      }
      .file_name {
        width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .file_size {
        width: 60px;
        color: #666;
        text-align: center;
      }
      .file_status {
        text-align: center;
      }
      .file_ctrl_btn {
        font-size: 20px;
        color: #237cc3;
      }
      .file_progress {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 0;
        padding: 0;
        z-index: 9;
        background: #ebf7fe;
        transition: width 0.5s;
      }
    }
  }
}
</style>
