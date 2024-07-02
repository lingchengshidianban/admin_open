import { defineStore } from 'pinia'

export const useUploadStore = defineStore('upload', {
  state: () => ({
    fileList: [],
    successFileList: []
  }),
  getters: {
    getFileList(state) {
      return state.fileList
    },
    getSuccessFileList(state) {
      return state.successFileList
    }
  },
  actions: {
    addFile(data) {
      this.fileList.push(data)
    },
    addSuccessFile(data) {
      this.successFileList.push(data)
    },
    // 清空文件
    clearFile() {
      this.fileList.splice(0, this.fileList.length)
    },
    clearSuccessFile() {
      // 从第一个索引开始（0）一直到数组的最后一个索引，删除这些元素。
      this.successFileList.splice(0, this.successFileList.length)
    }
  }
})
