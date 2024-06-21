<template>
  <el-radio-group v-model="modelValue" @change="handleChange">
    <el-radio v-for="item in enums" :key="item.code" :value="item.code">{{ item.desc }}</el-radio>
  </el-radio-group>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue'
  import { getEnumList } from '@/utils/base.js'

  const props = defineProps({
    modelValue: {
      type: Number,
      default: 0
    },
    modeName: {
      type: String,
      default: ''
    }
  })

  // computed 监听modelValue的变化
  const modelValue = computed(() => {
    return props.modelValue
  })

  const emit = defineEmits(['update:modelValue'])
  const handleChange = (val) => {
    // 用来触发父组件的change事件，改变父组件的modelValue值
    emit('update:modelValue', val)
  }
  const enums = ref([])
  onMounted(async () => {
    enums.value = await getEnumList(props.modeName)
  })
</script>

<style scoped lang="scss"></style>
