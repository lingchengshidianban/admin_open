<template>
  <el-dialog v-model="visible" :append-to-body="true" :width="450" title="图标选择" :destroy-on-close="true" center align-center @close="onClose">
    <div class="icon-list">
      <span v-for="item in visibleSet" :key="item" class="icon_span" @click="handleClick(item)"><icon style="font-size: 20px" :name="item" /><br />{{ item }}</span>
    </div>
  </el-dialog>
</template>

<script setup>
  import { ref, toRefs } from 'vue'
  import Icon from '@/components/Icon/index.vue'

  const props = defineProps({
    visible: {
      type: Boolean,
      default: false
    }
  })
  // 接受update事件
  const emit = defineEmits(['close', 'update'])

  const { visible } = toRefs(props)

  const visibleSet = ref(['概况', '常用', '装修', '课程', '用户', '系统'])

  const handleClick = (item) => {
    emit('update', item)
  }

  function onClose() {
    emit('close')
  }
</script>

<style lang="scss" scoped>
  .icon-list {
    margin-top: 20px;
    display: flex;
    gap: 27px;

    .icon_span {
      cursor: pointer;
      font-size: 20px;
      text-align: center;
    }
  }
</style>
