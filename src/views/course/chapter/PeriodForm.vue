<template>
  <el-dialog v-model="visible" :title="formModel.id ? '修改' : '添加'" :destroy-on-close="true" :append-to-body="true" center align-center @close="onClose">
    <el-form ref="formRef" :model="formModel" :rules="rules" label-width="80px">
      <el-form-item label="课时名称" prop="periodName">
        <el-input v-model="formModel.periodName" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item v-if="coursePrice > 0" label="收费设置" prop="isFree">
        <enum-radio v-model="formModel.isFree" :mode-name="'FreeEnum'" />
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
  const emit = defineEmits(['refresh'])
  const formRef = ref()
  const coursePrice = ref(0)
  const rules = {
    periodName: { required: true, message: '请输入名称', trigger: 'blur' }
  }
  const formDefault = {
    id: undefined,
    periodName: undefined,
    periodType: 10,
    isFree: 0
  }

  const formModel = reactive({ ...formDefault })
  const onClose = () => {
    visible.value = false
    Object.assign(formModel, formDefault)
  }
  const onOpen = (item) => {
    coursePrice.value = item.coursePrice
    if (item) {
      Object.assign(formModel, item)
    }
    visible.value = true
  }
  defineExpose({ onOpen })
  const loading = ref(false)
  const onSubmit = async () => {
    const valid = await formRef.value.validate()
    if (!valid) return
    loading.value = true
    try {
      if (formModel.id) {
        await courseApi.chapterPeriodEdit(formModel)
        ElMessage.success('修改成功')
      } else {
        await courseApi.chapterPeriodSave(formModel)
        ElMessage.success('添加成功')
      }
      emit('refresh')
      onClose()
    } finally {
      loading.value = false
    }
  }
</script>

<style scoped lang="scss"></style>
