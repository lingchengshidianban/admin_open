<template>
  <el-dialog v-model="visible" :destroy-on-close="true" title="菜单" :width="600" :append-to-body="true" center align-center @close="onClose">
    <el-form ref="formRef" :rules="rules" :model="formModel">
      <el-form-item label="类型" prop="menuType">
        <enum-radio v-model="formModel.menuType" :mode-name="'MenuTypeEnum'" />
      </el-form-item>
      <el-form-item label="名称" prop="menuName">
        <el-input v-model="formModel.menuName" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="路径"></el-form-item>
      <el-form-item label="组件"></el-form-item>
      <el-form-item label="前端权限"></el-form-item>
      <el-form-item label="后端接口"></el-form-item>
      <el-form-item label="属性"></el-form-item>
      <el-form-item label="图标"></el-form-item>
      <el-form-item label="排序"></el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary" @click="onSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
  import { ref, reactive } from 'vue'
  import EnumRadio from '@/components/Enum/Radio/index.vue'

  const onSubmit = () => {}

  const formRef = ref()
  const rules = {
    menuType: { required: true, message: '请选择类型', trigger: 'change' },
    menuName: { required: true, message: '请输入名称', trigger: 'blur' }
  }
  const formDefault = {
    menuType: undefined,
    menuName: undefined,
    menuIcon: undefined, // 菜单图标
    sort: undefined,
    path: undefined,
    permission: undefined
  }
  const formModel = reactive({ ...formDefault })

  // 开关
  const visible = ref(false)
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
