<template>
  <div style="border: 1px solid #ccc; width: 100%">
    <Toolbar style="border-bottom: 1px solid #ccc" mode="simple" :editor="editorRef" :default-config="toolbarConfig" />
    <Editor :default-config="editorConfig" style="height: 300px" :model-value="props.modelValue" @on-change="handleChange" @on-created="handleCreated" />
  </div>
</template>

<script setup>
  import '@wangeditor/editor/dist/css/style.css'
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
  import { shallowRef, onBeforeUnmount, ref } from 'vue'
  import registerMenu from './index.js'
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
  const handleCreated = (editor) => {
    editorRef.value = editor
    registerMenu(editorRef.value, toolbarConfig.value)
    initMenuEvent()
  }
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
</script>

<style scoped lang="scss"></style>
