<template>
  <el-dialog v-model="visible" :destroy-on-close="true" title="菜单" :width="600" :append-to-body="true" center align-center @close="onClose">
    <el-form ref="formRef" :rules="rules" :model="formModel" label-width="80px">
      <el-form-item label="类型" prop="menuType">
        <enum-radio v-model="formModel.menuType" :mode-name="'MenuTypeEnum'" />
      </el-form-item>
      <el-form-item label="名称" prop="menuName">
        <el-input v-model="formModel.menuName" maxlength="50" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item v-if="formModel.menuType === 2" label="路径" prop="path">
        <el-input v-model="formModel.path" maxlength="50" placeholder="请输入路径" />
      </el-form-item>
      <el-form-item v-if="formModel.menuType === 2" label="组件" prop="component">
        <el-input v-model="formModel.component" maxlength="50" placeholder="请输入路径" />
      </el-form-item>
      <el-form-item v-if="formModel.menuType !== 1" label="前端权限"><el-input v-model="formModel.permission" placeholder="请输入前端权限" /></el-form-item>
      <el-form-item v-if="formModel.menuType !== 1" label="后端接口">
        <el-input v-model="formModel.api" maxlength="50" type="textarea" :autosize="true" placeholder="请输入后端接口" />
      </el-form-item>
      <el-form-item v-if="formModel.menuType === 2" label="属性">
        <el-switch v-model="formModel.isShow" active-text="菜单" inactive-text="路由" />
      </el-form-item>
      <el-form-item label="图标" prop="sort">
        <icon :name="formModel.menuIcon" />
        <SelectorSvg :visible="iconVisible" @update="handleUpdateIcon" @close="onCloseIcon" />
        <el-button type="primary" link @click="onIconClick">选择图标</el-button>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number v-model="formModel.sort" :min="0" :max="999" />
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
  import EnumRadio from '@/components/Enum/Radio/index.vue'
  import SelectorSvg from '@/components/Selector/Svg/index.vue'
  import { SystemApi } from '@/api/system.js'

  const emit = defineEmits(['refresh'])
  const iconVisible = ref(false)

  const onIconClick = () => {
    iconVisible.value = true
  }
  const handleUpdateIcon = (item) => {
    formModel.menuIcon = item
    onCloseIcon()
  }
  const onCloseIcon = () => {
    iconVisible.value = false
  }

  const loading = ref(false)
  const onSubmit = async () => {
    const valid = await formRef.value.validate()
    if (!valid) return
    if (loading.value === true) return ElMessage.warning('正在处理，请稍后！')
    loading.value = true
    try {
      if (formModel.id) {
        await SystemApi.getMenuEdit(formModel)
        ElMessage.success('修改成功！')
      } else {
        await SystemApi.getMenuAdd(formModel)
        ElMessage.success('添加成功！')
      }
      onClose()
      emit('refresh')
    } finally {
      loading.value = false
    }
  }

  const formRef = ref()
  const rules = {
    menuType: { required: true, message: '请选择类型', trigger: 'change' },
    menuName: { required: true, message: '请输入名称', trigger: 'blur' }
  }
  const formDefault = {
    id: undefined,
    menuType: 1,
    menuName: undefined,
    menuIcon: undefined, // 菜单图标
    sort: undefined,
    path: undefined,
    permission: undefined,
    component: undefined
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
