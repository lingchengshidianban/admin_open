<template>
  <el-dialog :model-value="props.visible" :append-to-body="true" :destroy-on-close="true" :title="props.resourceName" center align-center width="400px" @clos="onClose">
    <div id="player"></div>
    <div style="text-align: center"><el-button @click="onClose">取消</el-button></div>
  </el-dialog>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { courseApi } from '@/api/course.js'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  resourceName: {
    type: String,
    default: '预览'
  },
  resourceId: {
    type: String,
    default: ''
  }
})
onMounted(() => {
  courseApi.resourcePreview({ id: props.resourceId }).then((res) => {
    if (res) {
      const params = JSON.parse(res.vodPlayConfig)
      // 领课云
      if (res.vodPlatform === 1) simplePlay(params)
      // 保利威视
      else if (res.vodPlatform === 2) polyvPlay(params)
    }
  })
})

// 领课云
const simplePlay = (params) => {
  window.polyvPlayer({
    wrap: '#player',
    autoplay: true, // 自动播放
    showLine: 'off',
    history_video_duration: 1,
    hideSwitchPlayer: true, //是否隐藏H5和Flash播放器的切换按钮。
    height: 350,
    url: params.hdUrl
  })
}
// 保利威视
const polyvPlay = (params) => {
  window.polyvPlayer({
    wrap: '#player',
    autoplay: true, // 自动播放
    showLine: 'off',
    history_video_duration: 1,
    hideSwitchPlayer: true, //是否隐藏H5和Flash播放器的切换按钮。
    height: 350,
    playsafe: params.token, // 播放加密凭证
    ...params
  })
}

const visible = ref(props.visible)
const emit = defineEmits(['close'])
function onClose() {
  visible.value = false
  emit('close')
}
</script>

<style scoped lang="scss"></style>
