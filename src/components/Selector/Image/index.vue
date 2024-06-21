<template>
  <div style="display: flex; align-items: flex-start">
    <el-image :src="imageUrl" :preview-src-list="[imageUrl]" :style="'width:' + width + ';height:' + height + ';'">
      <template #error>
        <div class="image-slot">
          <el-icon> <Picture /></el-icon>
        </div>
      </template>
    </el-image>
    <div class="image-box">
      <el-button type="primary" @click="handleSeltct">选择图片</el-button>
      <div class="image-box-info">{{ props.sugImg }}</div>
    </div>
  </div>
</template>

<script setup>
  import { watch, toRefs, ref } from 'vue'
  import { Picture } from '@element-plus/icons-vue'

  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    },
    sugImg: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }
  })
  const emit = defineEmits(['update:modelValue'])

  const picVisible = ref(false)
  const imageUrl = ref()
  const { modelValue } = toRefs(props)
  // 监听图片地址变化
  watch(
    modelValue,
    (newVal) => {
      imageUrl.value = newVal
    },
    {
      immediate: true
    }
  )
  const handleSeltct = () => {
    picVisible.value = true
  }
  const handleCallback = (item) => {
    picVisible.value = false
    if (item) {
      emit('update:modelValue', item[0].resourceUrl)
    }
  }
</script>

<style scoped lang="scss">
  .image-box {
    margin-left: 20px;
    font-size: 12px;
    color: #999;
    .image-box-info {
      margin-top: 20px;
    }
  }
  .image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: var(--el-fill-color-light);
    color: var(--el-text-color-secondary);
    font-size: 30px;
  }
</style>
