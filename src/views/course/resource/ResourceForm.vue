<template>
  <el-dialog :title="formModel.id ? '新增' : '修改'" :model-value="visible" :destroy-on-close="true" center align-center width="600px" @close="onClose">
    <el-form ref="formRef" :rules="rules" @submit.prevent>
      <el-form-item prop="resourceName">
        <el-input v-model="formModel.resourceName" placeholder="请输入资源名称" maxlength="125" show-word-limit />
      </el-form-item>
      <el-form-item prop="sort">
        <el-input-number v-model="formModel.sort" :min="1" :max="100" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="onClose()">取消</el-button>
      <el-button type="primary" @click="onSubmit()">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
  import { ElMessage } from 'element-plus'
  import { ref, reactive } from 'vue'
  import { courseApi } from '@/api/course.js'
  const formRef = ref()
  // 校验
  const emit = defineEmits(['refresh'])
  const rules = {
    resourceName: [{ required: true, message: '请输入资源名称', trigger: 'blur' }]
  }
  const formDefault = {
    id: undefined,
    resourceName: undefined,
    sort: 1
  }
  const formModel = reactive({ ...formDefault })
  const visible = ref(false)
  const loading = ref(false)
  const onSubmit = async () => {
    const res = formRef.value.validate()
    if (!res) return
    loading.value = true
    if (loading.value === true) {
      ElMessage.success('...正在提交中,请稍等')
    }
    try {
      if (formModel.id) {
        await courseApi.resourceEdit(formModel)
        ElMessage.success('修改成功')
      } else {
        await courseApi.resourceSave(formModel)
        ElMessage.success('新增成功')
      }
      emit('refresh')
      onClose()
    } finally {
      loading.value = false
    }
  }
  const onOpen = (row) => {
    if (row) {
      Object.assign(formModel, row)
    }
    visible.value = true
  }
  // 暴露onOpen
  defineExpose({ onOpen })
  const onClose = () => {
    Object.assign(formModel, formDefault)
    visible.value = false
  }
</script>

<style scoped lang="scss"></style>
