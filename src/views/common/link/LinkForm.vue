<template>
  <el-dialog :append-to-body="true" :model-value="visible" align-center :title="formModel.id ? '修改' : '新增'" width="600px" centre aligb-center :destroy-on-close="false" @close="onClose">
    <el-form ref="formRef" :model="formModel" :rules="rules" label-width="80px" @submit.prevent>
      <el-form-item label="名称" prop="linkName">
        <el-input v-model="formModel.linkName" maxlength="10" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="地址" prop="linkUrl">
        <el-input v-model="formModel.linkUrl" maxlength="255" placeholder="请输入地址" />
      </el-form-item>
      <el-form-item label="跳转方式" prop="linkTarget">
        <EnumRadio v-model="formModel.linkTarget" :mode-name="'TargetEnum'" />
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
import { ref, reactive } from 'vue'
import EnumRadio from '@/components/Enum/Radio/index.vue'
import { SystemApi } from '@/api/system'

// 表单引用
const formRef = ref()
// 表单数据
const form = reactive({
  id: undefined,
  linkName: undefined,
  linkTarget: undefined,
  linkUrl: undefined,
  sort: 1
})
// 表单数据
const formModel = reactive({ ...form })

const loading = ref(false)

const rules = {
  linkName: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  linkUrl: [{ required: true, message: '请输入链接', trigger: 'blur' }],
  linkTarget: [{ required: true, message: '不能为空', trigger: 'blur' }]
}
const emit = defineEmits(['refresh'])
const onSubmit = async () => {
  const res = await formRef.value.validate()
  if (!res) return

  if (loading.value === true) {
    ElMessage.warning('正在处理...')
    return
  }
  try {
    if (formModel.id) {
      await SystemApi.getFriendEdit(formModel)
      ElMessage.success('修改成功')
    } else {
      await SystemApi.getFriendAdd(formModel)
      ElMessage.success('添加成功')
    }
    onClose()
    // 刷新
    emit('refresh')
  } finally {
    loading.value = false
  }
}

const visible = ref(false)
const onOpen = (item) => {
  if (item) {
    Object.assign(formModel, item)
  }
  visible.value = true
}
const onClose = () => {
  visible.value = false
  Object.assign(formModel, form)
}
defineExpose({ onOpen })
</script>

<style scoped lang="scss"></style>
