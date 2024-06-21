<template>
  <el-dialog :title="formModel.id ? '编辑' : '新增'" :model-value="visible" :destroy-on-close="true" center align-center width="600px" @close="onClose">
    <el-form ref="formRef" :rules="rules" @submit.prevent>
      <el-form-item label="文件名" prop="categoryName">
        <el-input v-model="formModel.categoryName" maxlength="100" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="onClose()">取消</el-button>
      <el-button type="primary" @click="onSubmit()">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
  import { ElMessage } from 'element-plus'
  import { reactive, ref } from 'vue'
  import { courseApi } from '@/api/course.js'

  const formRef = ref()
  const rules = {
    categoryName: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
  }
  const formDefault = {
    id: undefined,
    categoryName: undefined,
    parentId: 0,
    categoryType: 2,
    sort: 1
  }
  const emit = defineEmits(['refresh'])
  const formModel = reactive({ ...formDefault })

  const loading = ref(false)
  const onSubmit = () => {
    const res = formRef.value.validate()
    if (!res) return
    if (loading.value === true) {
      ElMessage.warning('正在提交中，请稍后')
    }
    loading.value = true
    try {
      if (formModel.id) {
        courseApi.categoryEdit(formModel)
        ElMessage.success('修改成功')
      } else {
        courseApi.categorySave(formModel)
        ElMessage.success('添加成功')
      }
      emit('refresh')
      onClose()
    } finally {
      loading.value = false
    }
  }

  const onOpen = (item, parentId) => {
    if (item) {
      Object.assign(formModel, item)
    }
    if (parentId) {
      formModel.parentId = parentId
      formModel.id = undefined
      formModel.categoryName = undefined
    }
    visible.value = true
  }
  const visible = ref(false)
  const onClose = () => {
    visible.value = false
    Object.assign(formModel, formDefault)
  }
  defineExpose({ onOpen })
</script>

<style scoped lang="scss"></style>
