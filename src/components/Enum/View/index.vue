<template>
  <span>{{ enumVal }}</span>
</template>

<script setup>
  import { ref, watch, toRefs, onMounted } from 'vue'
  import { getEnumObj } from '@/utils/base.js'

  const props = defineProps({
    enumName: {
      type: String,
      default: ''
    },
    enumValue: {
      type: Number,
      default: 0
    }
  })
  let enumObj = []
  // 让enumObj响应式不会掉
  const { enumValue } = toRefs(props)
  const enumVal = ref()
  // 监听enumValue,将变化的新值赋值给enumObj
  watch(enumValue, (newValue) => {
    enumVal.value = enumObj[newValue]
  })

  onMounted(() => {
    getEnumObj(props.enumName).then((res) => {
      enumObj = res
      enumVal.value = enumObj[props.enumValue]
    })
  })
</script>

<style scoped lang="scss"></style>
