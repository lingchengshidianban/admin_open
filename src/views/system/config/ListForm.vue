<template>
  <el-dialog v-model="visible" :append-to-body="true" center align-center :title="config.configName" width="600" @close="onClose">
    <div v-html="config.configValue" />
    <template #footer>
      <el-button @click="visible = false">取 消</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
  import { ref, reactive } from 'vue'

  const visible = ref(false)

  const config = reactive({
    configName: undefined,
    configValue: undefined
  })
  function onOpen(item) {
    visible.value = true
    if (item) return Object.assign(config, item)
  }
  defineExpose({ onOpen })
  function onClose() {
    visible.value = false
    Object.assign(config, {})
  }
</script>

<style scoped lang="scss"></style>
