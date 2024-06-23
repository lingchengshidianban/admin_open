<template>
  <el-dialog v-model="visible" title="修改" :destroy-on-close="true" width="820px" :append-to-body="true" center align-center @close="onClose">
    <el-form :model="formRef" :rules="rules">
      <el-form-item prop="configValue">
        <el-input v-if="formModel.contentType === 1" v-model="formModel.configValue" autosize="true" placeholder="请输入内容类型" type="textarea" />
        <editor v-if="formModel.contentType === 2" v-model="formModel.configValue" />
        <EnumRadio v-if="formModel.configKey === 'smsPlatform'" v-model="formModel.configValue" :mode-name="'SmsPlatformEnum'" />
        <EnumRadio v-if="formModel.configKey === 'storagePlatform'" v-model="formModel.configValue" :mode-name="'StoragePlatformEnum'" />
        <EnumRadio v-if="formModel.configKey === 'livePlatform'" v-model="formModel.configValue" :mode-name="'LivePlatformEnum'" />
        <EnumRadio v-if="formModel.configKey === 'vodPlatform'" v-model="formModel.configValue" :mode-name="'VodPlatformEnum'" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary" @click="onSubmit()">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
  import EnumRadio from '@/components/Enum/Radio/index.vue'
  import Editor from '@/components/Editor/index.vue'
  import { ElMessage } from 'element-plus'
  import { reactive, ref } from 'vue'
  import { SystemApi } from '@/api/system.js'

  const emit = defineEmits(['refresh'])
  const formRef = ref()
  const rules = {
    configValue: [{ required: true, message: '请输入内容类型', trigger: 'blur' }]
  }
  const visible = ref(false)
  const formDefault = {
    id: undefined,
    contentType: undefined,
    configValue: undefined,
    configKey: undefined
  }
  const formModel = reactive({ ...formDefault })

  const loading = ref(false)
  function onClose() {
    Object.assign(formModel, formDefault)
    visible.value = false
  }
  async function onSubmit() {
    const res = await formRef.value.validate()
    if (!res) return
    if (loading.value === true) {
      ElMessage.warning('正在处理···')
      return
    }
    loading.value = true
    try {
      if (formModel.id) {
        console.log(formModel)
        await SystemApi.sysConfigEdit(formModel)
        ElMessage.success('修改成功')
      } else {
        await SystemApi.sysConfigAdd(formModel)
        ElMessage.success('新增成功')
      }
      emit('refresh')
      onClose()
    } finally {
      loading.value = false
    }
  }
  function onOpen(item) {
    if (item) {
      Object.assign(formModel, item)
      if (item.contentType === 5) {
        formModel.configValue = parseInt(formModel.configValue)
      }
    }
    visible.value = true
  }
  defineExpose({ onOpen })
</script>

<style scoped lang="scss"></style>
