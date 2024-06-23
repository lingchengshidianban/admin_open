<template>
  <el-dialog v-model="visible" :title="formModel.id ? '修改' : '添加'" :append-to-body="true" width="600px" center align-center :destroy-on-close="true" @close="onClose">
    <el-form ref="formRef" :rules="rules" label-width="80px" :model="formModel">
      <el-form-item label="App上传">
        <el-input v-model="formModel.updateUrl" style="width: 300px" />
        <UploadApp v-model="formModel.updateUrl" />
      </el-form-item>
      <el-form-item label="发布版本" prop="publishTime"
        ><el-date-picker v-model="formModel.publishTime" type="date" style="width: 300px" value-format="YYYY-MM-DD HH:mm:ss" format="YYYY-MM-DD HH:mm:ss" placeholder="选择日期"
      /></el-form-item>
      <el-form-item label="应用类型" prop="appType">
        <enum-radio v-model="formModel.appType" :mode-name="'AppTypeEnum'" />
      </el-form-item>
      <el-form-item label="应用版本" prop="appVersion">
        <el-input v-model="formModel.appVersion" maxlength="100" />
      </el-form-item>
      <el-form-item label="升级类型">
        <enum-radio v-model="formModel.updateForce" :mode-name="'UpdateForceEnum'" />
      </el-form-item>
      <el-form-item label="升级内容" prop="updateTips">
        <el-input v-model="formModel.updateTips" type="textarea" maxlength="500" autosize="true" />
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
  import UploadApp from '@/components/Upload/App/index.vue'
  import EnumRadio from '@/components/Enum/Radio/index.vue'

  const emit = defineEmits(['refresh'])
  const formRef = ref()
  const rules = {
    updateUrl: { required: true, message: '不能为空', trigger: 'blur' },
    appVersion: { required: true, message: '不能为空', trigger: 'blur' }
  }
  const formDefault = {
    id: undefined,
    updateUrl: undefined,
    appType: 1, //
    appVersion: undefined, // 版本
    publishTime: undefined,
    updateForce: 1,
    updateTips: undefined,
    sort: 1
  }
  const formModel = reactive({ ...formDefault })

  const visible = ref(false)

  const loading = ref(false)
  const onSubmit = async () => {
    const res = formRef.value.validate()
    if (!res) return
    if (loading.value === true) {
      ElMessage.warning('正在提交中，请稍后')
      return
    }
    loading.value = true
    try {
      if (formModel.id) {
        await SystemApi.getAppVersionEdit(formModel)
        ElMessage.success('修改成功')
      } else {
        await SystemApi.getAppVersionAdd(formModel)
        ElMessage.success('添加成功')
      }
      emit('refresh')
      onClose()
    } finally {
      loading.value = false
    }
  }
  // 开关
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
