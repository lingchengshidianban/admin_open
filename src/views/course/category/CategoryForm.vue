<template>
  <el-dialog :title="formModel.id ? '编辑分类' : '新增分类'" :visible="visible" :destroy-on-close="true" :model-value="visible" align-center center width="600px" @close="onclose">
    <el-form ref="formRef" :rules="rules" :model="formModel" @submit.prevent>
      <el-form-item label="名称" prop="categoryName">
        <el-input v-model="formModel.categoryName" show-word-limit maxlength="50" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number v-model="formModel.sort" min="1" max="100" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="onclose()">取消</el-button>
      <el-button type="primary" @click="onSubmit()">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
import { courseApi } from '@/api/course.js'

const formRef = ref()
const rules = {
  categoryName: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
}
const formDefault = {
  id: undefined,
  sort: 1,
  parentId: '',
  categoryName: undefined
}
const emit = defineEmits(['refresh'])
const loading = ref(false)
const visible = ref(false)
const formModel = reactive({ ...formDefault })

const onSubmit = async () => {
  // 开启验证
  const res = await formRef.value.validate()
  if (!res) {
    return
  }
  if (loading.value === true) {
    return ElMessage.success('正在提交请稍等...')
  }
  loading.value = true
  try {
    if (formModel.id) {
      await courseApi.categoryEdit(formModel)
      ElMessage.success('修改成功')
    } else {
      await courseApi.categorySave(formModel)
      ElMessage.success('新增成功')
    }
    emit('refresh')
    onclose()
  } finally {
    loading.value = false
  }
}
function onOpen(item, parentId) {
  if (item) {
    Object.assign(formModel, item)
  }
  if (parentId) {
    formModel.parentId = parentId
  }
  visible.value = true
}
defineExpose({ onOpen })
function onclose() {
  visible.value = false
  // 当执行Object.assign方法时，如果formDefault中有基本数据类型，这里值就会被直接复制到fromModel中，如果formDefault中有引用数据类型，这里值就会被直接复制到fromModel中，
  // 如果formModel中已经存在formDefault中同名的属性，那么formModel中的同名属性会被直接覆盖
  Object.assign(formModel, formDefault)
}
</script>

<style scoped lang="scss"></style>
