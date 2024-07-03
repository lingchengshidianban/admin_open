<template>
  <el-dialog :model-value="visible" title="新增区域" :destroy-on-close="true" :append-to-body="true" center align-center :width="600" @close="onClose">
    <el-form ref="formRef" :rules="rules" :model="formModel">
      <el-form-item label="名称" prop="zoneName">
        <el-input v-model="formModel.zoneName" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="备注" prop="zoneDesc">
        <el-input v-model="formModel.zoneDesc" placeholder="请输入描述" />
      </el-form-item>
      <el-form-item label="状态" prop="statusId">
        <EnumRadio v-model="formModel.statusId" :mode-name="'StatusIdEnum'" />
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
import { courseApi } from '@/api/course.js'
import EnumRadio from '@/components/Enum/Radio/index.vue'

const visible = ref(false)
const formDefault = {
  id: undefined,
  zoneName: '',
  zoneDesc: '',
  statusId: 1,
  sort: 1
}
const formRef = ref()
const rules = {
  zoneName: { required: true, message: '请输入名称', trigger: 'blur' },
  zoneDesc: { required: true, message: '请输入描述', trigger: 'blur' }
}

const formModel = reactive({ ...formDefault })

const emit = defineEmits(['refresh'])
const loading = ref(false)
async function onSubmit() {
  const res = formRef.value.validate()
  if (!res) return
  if (loading.value === true) return ElMessage.warning('正在提交中，请稍后')
  loading.value = true
  try {
    if (formModel.id) {
      await courseApi.zoneEdit(formModel)
      ElMessage.success('修改成功')
    } else {
      await courseApi.zoneSave(formModel)
      ElMessage.success('添加成功')
    }
    emit('refresh')
    onClose()
  } finally {
    loading.value = false
  }
}
function onOpen(row) {
  visible.value = true
  Object.assign(formModel, row)
}
defineExpose({ onOpen })
function onClose() {
  visible.value = false
  Object.assign(formModel, formDefault)
}
</script>

<style scoped lang="scss"></style>
