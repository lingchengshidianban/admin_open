<template>
  <el-dialog v-model="visible" title="添加余额" :width="600" :append-to-body="true" center align-center :destroy-on-close="true" @close="onClose">
    <el-form ref="formRef" :rules="rules" :model="formModel" :label-width="80">
      <el-form-item label="消费类型" prop="consumeType">
        <enum-radio v-model="formModel.consumeType" :mode-name="'ConsumeTypeEnum'"></enum-radio>
      </el-form-item>
      <el-form-item label="金额大小">
        <el-input-number v-model="formModel.consumeAmount" :min="0" :max="99999999" :precision="2" :step="0.01" :label="'金额大小'" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="formModel.remark" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary" @click="onSubmit()">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
  import { ref, reactive } from 'vue'
  import EnumRadio from '@/components/Enum/Radio/index.vue'
  import { ElMessage } from 'element-plus'
  import { usersApi } from '@/api/users.js'

  const visible = ref(false)
  const formRef = ref(null)
  const rules = {
    consumeType: { required: true, message: '请选择消费类型', trigger: 'change' }
  }

  const emit = defineEmits(['refresh'])
  const formDefault = {
    userId: undefined,
    consumeType: 2, // 消费类型
    consumeAmount: 0
  }
  const loading = ref(false)
  const onSubmit = async () => {
    const valid = await formRef.value.validate()
    if (!valid) return
    if (loading.value === true) return ElMessage.warning('正在处理···')
    loading.value = true
    try {
      await usersApi.usersAccountConsumeSave(formModel)
      ElMessage.success('操作成功')
      emit('refresh')
      onClose()
    } finally {
      loading.value = false
    }
  }
  const formModel = reactive({ ...formDefault })
  function onOpen(userId) {
    console.log(userId)
    formModel.userId = userId
    visible.value = true
  }
  defineExpose({ onOpen })
  const onClose = () => {
    visible.value = false
    Object.assign(formModel, formDefault)
  }
</script>

<style scoped lang="scss"></style>
