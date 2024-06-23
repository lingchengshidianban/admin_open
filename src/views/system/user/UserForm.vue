<template>
  <el-dialog v-model="visible" :destroy-on-close="true" :append-to-body="true" :title="formModel.id ? '修改' : '添加'" :width="600" center align-center @close="onClose">
    <el-form ref="formRef" :model="formModel" :rules="rules" label-width="auto">
      <el-form-item v-if="!formModel.id" label="登录账号" prop="mobile">
        <el-input v-model="formModel.mobile" />
      </el-form-item>
      <el-form-item v-if="!formModel.id" label="登录密码" prop="mobilePwdEncrypt">
        <el-input v-model="formModel.mobilePwdEncrypt" type="password" show-password />
      </el-form-item>
      <el-form-item label="用户昵称" prop="realName">
        <el-input v-model="formModel.realName" maxlength="20" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="formModel.remark" :autosize="true" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary" @click="onSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
  import { ref, reactive } from 'vue'
  import { ElMessage } from 'element-plus'
  import { SystemApi } from '@/api/system.js'

  const loading = ref(false)
  const emit = defineEmits(['refresh'])
  const formRef = ref()
  const rules = {
    mobile: [{ required: true, message: '请输入登录账号', trigger: 'blur' }],
    mobilePwdEncrypt: [{ required: true, message: '请输入登录密码', trigger: 'blur' }],
    realName: [{ required: true, message: '请输入用户昵称', trigger: 'blur' }]
  }

  const formDefault = {
    id: '',
    mobile: '',
    mobilePwdEncrypt: '',
    realName: '',
    remark: ''
  }
  const formModel = reactive({ ...formDefault })
  const visible = ref(false)

  async function onSubmit() {
    const valid = await formRef.value.validate()
    if (!valid) return
    if (loading.value === true) return ElMessage.warning('正在提交中，请稍后')
    loading.value = true
    try {
      if (formModel) {
        await SystemApi.getAdminAdd(formModel)
        ElMessage.success('添加成功')
      } else {
        await SystemApi.getAdminEdit(formModel)
        ElMessage.success('编辑成功')
      }
      emit('refresh')
      onClose()
    } finally {
      loading.value = false
    }
  }

  function onClose() {
    visible.value = false
  }
  function onOpen(row) {
    if (row) {
      Object.assign(formModel, row)
    }
    visible.value = true
  }
  defineExpose({ onOpen })
</script>

<style scoped lang="scss"></style>
