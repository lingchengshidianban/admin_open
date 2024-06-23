<template>
  <!--重置密码-->
  <el-dialog v-model="visible" :append-to-body="true" :destroy-on-close="true" title="密码" width="600px" center align-center @close="onClose">
    <el-form ref="formRef" :rules="rules" :model="formModel">
      <el-form-item prop="password" label="登录密码">
        <el-input v-model="formModel.password" type="password" />
      </el-form-item>
      <el-form-item prop="verifyPaw" label="确认密码">
        <el-input v-model="formModel.verifyPaw" type="password" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
  import { reactive, ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import { SystemApi } from '@/api/system.js'

  const visible = ref(false)
  const formRef = ref()
  const formDefault = {
    userId: '',
    verifyPaw: '',
    password: ''
  }
  const formModel = reactive({ ...formDefault })

  const rules = {
    verifyPaw: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
    password: [{ required: true, message: '内容不能为空', trigger: 'blur' }]
  }
  const lading = ref(false)
  const onSubmit = async () => {
    const res = formRef.value.validate()
    if (!res) return
    if (lading.value === true) return ElMessage.warning('正在加载中...')
    if (formModel.password !== formModel.verifyPaw) {
      ElMessage.warning('密码不一致')
    } else {
      await SystemApi.getAdminReset(formModel)
    }
  }
  const onClose = () => {
    visible.value = false
    Object.assign(formModel, formDefault)
  }
  const onOpen = (item) => {
    if (item) {
      Object.assign(formModel, item)
    }
    visible.value = true
  }
  defineExpose({ onOpen })
</script>

<style scoped lang="scss"></style>
