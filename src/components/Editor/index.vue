<template>
  <div style="border: 1px solid #ccc; width: 100%">
    <Toolbar style="border-bottom: 1px solid #ccc" mode="simple" :editor="editorRef" :default-config="toolbarConfig" />
    <Editor :default-config="editorConfig" style="height: 300px" :model-value="props.modelValue" @on-change="handleChange" @on-created="handleCreated" />
  </div>
  <select-resource v-if="picVisible" :visible="picVisible" :title="'选择图片'" :multiple="true" :resource-type="4" @close="handleCallback" />
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { shallowRef, onBeforeUnmount, ref } from 'vue'
import registerMenu from './index.js'
import SelectResource from '@/components/Select/Resource/index.vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['update:modelValue'])
onBeforeUnmount(() => {
  const editor = editorRef.value
  // 判断editor是否存在
  if (editor == null) return
  // 如果存在，则销毁
  editor.destroy()
})
const editorRef = shallowRef()

const handleChange = (editor) => {
  emit('update:modelValue', editor.getHtml())
}
// 创建编辑器
const handleCreated = (editor) => {
  editorRef.value = editor
  // 注册菜单
  registerMenu(editorRef.value, toolbarConfig.value)
  initMenuEvent()
}
// 工具栏配置
const toolbarConfig = ref({
  excludeKeys: ['insertLink', 'todo', 'clearStyle', 'emotion', 'group-image', 'insertVideo', 'insertTable', 'redo', 'undo', 'fullScreen']
})
const editorConfig = ref({})

const picVisible = ref(false)
const initMenuEvent = () => {
  const editor = editorRef.value
  editor.on('PicMenuClick', () => {
    picVisible.value = true
  })
}
const handleCallback = (val) => {
  picVisible.value = false
  if (val) {
    const editor = editorRef.value
    val.forEach((item) => {
      // insertNode 方法插入图片
      editor.insertNode({ type: 'image', src: item.resourceUrl, children: [{ text: '' }] })
    })
  }
}
</script>

<style scoped lang="scss"></style>
