<template>
  <el-dialog v-model="visible" title="查看" :destroy-on-close="true" :append-to-body="true" :width="500" align-center @close="onClose">
    <VueJsonPretty :data="formModel.content"></VueJsonPretty>
    <template #footer>
      <el-button @click="onClose">关闭</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
  import { ref, reactive } from 'vue'
  import VueJsonPretty from 'vue-json-pretty' //
  import 'vue-json-pretty/lib/styles.css'

  const formDafult = {
    id: undefined,
    content: undefined
  }
  const formModel = reactive({ ...formDafult })

  const visible = ref(false)
  const onOpen = (item) => {
    if (item) {
      formModel.id = item.id
      formModel.content = JSON.parse(item.content)
    }
    visible.value = true
  }
  defineExpose({ onOpen })
  const onClose = () => {
    visible.value = false
    Object.assign(formModel, formDafult)
  }
</script>

<style scoped lang="scss"></style>
