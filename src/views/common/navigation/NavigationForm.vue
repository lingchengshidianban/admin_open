<template>
  <el-dialog
    v-model:visible="visible"
    :model-value="visible"
    :title="formModel.id ? '编辑导航' : '新增导航'"
    :append-to-body="true"
    :destroy-on-close="true"
    centre
    align-center
    width="600px"
    @close="onClose"
  >
    <el-form ref="formRef" :rules="rules" :model="formModel" label-width="80px">
      <el-form-item label="导航标题" prop="navTitle">
        <el-input v-model="formModel.navTitle" placeholder="请输入导航标题" maxlength="10" />
      </el-form-item>
      <el-form-item label="导航链接" prop="navUrl">
        <el-input v-model="formModel.navUrl" placeholder="请输入导航链接" />
      </el-form-item>
      <el-form-item label="打开方式" prop="navTarget">
        <el-radio-group v-model="formModel.navTarget">
          <el-radio :label="1">新窗口打开</el-radio>
          <el-radio :label="2">当前窗口打开</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit()">确 定</el-button>
      </span>
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
    navTitle: [{ required: true, message: '请输入导航标题', trigger: 'blur' }],
    navUrl: [{ required: true, message: '请输入导航链接', trigger: 'blur' }]
  }
  const formDefault = {
    id: undefined,
    navTitle: undefined,
    navUrl: undefined,
    navTarget: 1,
    sort: 1
  }
  const formModel = reactive({ ...formDefault })

  const onSubmit = async () => {
    const valid = await formRef.value.validate()
    if (!valid) return
    if (loading.value === true) {
      ElMessage.warning('请勿重复提交')
      return
    }
    loading.value = true
    try {
      if (formModel.id) {
        await SystemApi.getHeaderEdit(formModel)
      } else {
        await SystemApi.getHeaderAdd(formModel)
      }
      emit('refresh')
      onClose()
    } finally {
      loading.value = false
    }
  }
  // 打开关闭
  const visible = ref(false)
  const onOpen = (item) => {
    if (item) {
      Object.assign(formModel, item)
    }
    visible.value = true
  }
  const onClose = () => {
    visible.value = false
    Object.assign(formModel, formDefault)
  }
  defineExpose({ onOpen }) // 暴露onOnpen方法
</script>

<style scoped lang="scss"></style>
