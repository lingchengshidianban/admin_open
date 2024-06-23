<template>
  <el-dialog v-model="visible" title="角色管理" width="600px" :destroy-on-close="true" :append-to-body="true" center align-center>
    <el-form ref="formRef" :model="formModel" label-width="80px" :rules="rules">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="formModel.roleName" maxlength="20" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="formModel.remark" :autosize="true" type="textarea" maxlength="500" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary" @click="onSubmit">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
  import { ref, reactive } from 'vue'
  import { ElMessage } from 'element-plus'
  import { SystemApi } from '@/api/system.js'

  const visible = ref(false)
  const formRef = ref()
  const rules = {
    roleName: { required: true, message: '名称不能为空', trigger: 'blur' }
  }

  const emit = defineEmits(['refresh'])
  const formDefault = {
    roleName: '',
    remark: ''
  }
  const formModel = reactive({ ...formDefault })
  const loading = ref(false)

  const onSubmit = async () => {
    const valid = await formRef.value.validate()
    if (!valid) return
    if (loading.value === true) return ElMessage.success('正在处理...')
    try {
      if (formModel.id) {
        await SystemApi.getRoleEdit(formModel)
        ElMessage.success('修改成功')
      } else {
        await SystemApi.getRoleAdd(formModel)
        ElMessage.success('添加成功')
      }
      emit('refresh')
      onClose()
      loading.value = true
    } finally {
      loading.value = false
    }
    visible.value = false
  }

  const onOpen = (row) => {
    if (row) {
      Object.assign(formModel, row)
    }
    visible.value = true
  }
  defineExpose({ onOpen })

  const onClose = () => {
    visible.value = false
    Object.assign(formModel, formDefault)
  }
</script>

<style scoped lang="scss"></style>
