<template>
  <el-dialog v-model="visible" :destroy-on-close="true" :title="formModel.id ? '添加' : '编辑'" :append-to-body="true" center align-center width="1000px" @close="onClose">
    <el-form ref="fromRef" :rules="rules" :model="formModel" label-width="60px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="名称" prop="lecturerName">
            <el-input v-model="formModel.lecturerName" show-word-limit prefix-icon="search" />
          </el-form-item>
          <el-form-item label="职位" prop="lecturerPosition">
            <el-input v-model="formModel.lecturerPosition" show-word-limit prefix-icon="search" />
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input-number v-model="formModel.sort" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="lecturerHead">
            <SelectorImage v-model="formModel.lecturerHead" :width="'120px'" :height="'120px'" :sug-img="'尺寸：120x120px，格式：JPG、PNG，大小：<2M'" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="简介" prop="introduce">
        <Editor v-model="formModel.introduce" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="onClose">取消</el-button>
      <el-button v-loading="loading" type="primary" @click="onSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import Editor from '@/components/Editor/index.vue'
import SelectorImage from '@/components/Selector/Image/index.vue'
import { usersApi } from '@/api/users.js'

const fromRef = ref()
const rules = {
  lecturerName: { required: true, message: '请输入名称', trigger: 'blur' },
  lecturerPosition: { required: true, message: '请输入职位', trigger: 'blur' }
}
const emit = defineEmits(['refresh'])
const formDefault = {
  id: undefined,
  introduce: undefined,
  lecturerHead: undefined,
  lecturerName: undefined,
  lecturerPosition: undefined,
  sort: undefined
}
const formModel = reactive({ ...formDefault })

// 确认
const loading = ref(false)
const onSubmit = async () => {
  const res = await fromRef.value.validate()
  if (!res) {
    return
  }
  if (loading.value === true) {
    return ElMessage.warning('正在提交中，请稍后')
  }
  loading.value = true
  try {
    if (formModel.id) {
      await usersApi.teacherUpdate(formModel)
      ElMessage.success('编辑成功')
    } else {
      await usersApi.teacherSave(formModel)
      ElMessage.success('添加成功')
    }
    emit('refresh')
    onClose()
  } finally {
    loading.value = false
  }
}

const visible = ref(false)
const onOpen = async (item) => {
  if (item) {
    await usersApi.teacherInfo({ id: item.id }).then((res) => {
      Object.assign(formModel, res)
    })
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
