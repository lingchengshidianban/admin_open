<template>
  <el-cascader :options="options" :props="props" style="width: 100%" @change="handleChange"></el-cascader>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { courseApi } from '@/api/course.js'

  onMounted(() => {
    courseApi.categoryList().then((res) => {
      options.value = res
    })
  })

  const emit = defineEmits(['update:modelValue'])
  const handleChange = (item) => {
    emit('update:modelValue', item.pop())
  }

  const options = ref([])

  const props = {
    value: 'id',
    label: 'categoryName',
    children: 'childrenList',
    expandTrigger: 'hover'
  }
</script>

<style scoped lang="scss"></style>
