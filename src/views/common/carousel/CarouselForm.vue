<template>
  <el-dialog :title="formModel.id ? '修改' : '添加'" :model-value="visible" :append-to-body="true" :destroy-on-close="true" center align-center :width="800" @close="onClose">
    <el-form ref="formRef" :model="formModel" :rules="rules">
      <el-form-item label="轮播广告">
        <SelectorImage v-model="formModel.carouselImg" :width="'200px'" :height="'70px'" :sug-img="'尺寸：1000x360px，格式：JPG、PNG，大小：<2M'" />
      </el-form-item>
      <el-form-item label="跳转链接" prop="carouselUrl">
        <el-input v-model="formModel.carouselUrl" maxlength="255" show-word-limit />
      </el-form-item>
      <el-form-item label="跳转方式" prop="carouselTarget">
        <EnumRadio v-model="formModel.carouselTarget" :mode-name="'TargetEnum'" />
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
  import SelectorImage from '@/components/Selector/Image/index.vue'
  import EnumRadio from '@/components/Enum/Radio/index.vue'
  import { SystemApi } from '@/api/system.js'
  import { ElMessage } from 'element-plus'

  const visible = ref(false)
  const formRef = ref(null)
  const formDefault = {
    id: undefined,
    carouselImg: undefined,
    carouselUrl: undefined,
    carouselTarget: undefined
  }
  const formModel = reactive({ ...formDefault })
  const rules = {
    name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
  }

  const emit = defineEmits(['refresh'])
  const loading = ref(false)
  const onSubmit = async () => {
    const res = await formRef.value.validate()
    if (!res) return
    if (loading.value === true) return
    loading.value = true
    try {
      if (formModel.id) {
        await SystemApi.carouselEdit(formModel)
        ElMessage.success('修改成功')
      } else {
        await SystemApi.carouselSave(formModel)
        ElMessage.success('添加成功')
      }
      onClose()
      emit('refresh')
    } finally {
      loading.value = false
    }
  }
  const onOpen = (item) => {
    if (item) {
      Object.assign(formModel, item)
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
