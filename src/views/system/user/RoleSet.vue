<template>
  <el-dialog v-model="visible" title="角色设置" width="800px" :destroy-on-close="true" :append-to-body="true" center align-center @close="onClose">
    <el-form :model="query" inline label-width="80px">
      <el-form-item label="角色名称">
        <el-input v-model="query.roleName" placeholder="请输入角色名称" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="tableRef" v-loading="page.loading" :data="page.list">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="roleName" label="角色名称" />
      <el-table-column prop="remark" label="备注" />
    </el-table>
    <template #footer>
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
  import { ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import { SystemApi } from '@/api/system.js'
  import useTable from '@/utils/table.js'

  const userId = ref('') // 用户id
  const emit = defineEmits(['refresh'])
  const tableRef = ref()

  const onSubmit = async () => {
    const roles = tableRef.value.getSelectionRows()
    if (roles.length > 0) {
      roleIds.value = []
      roles.forEach((item) => {
        roleIds.value.push(item.id)
      })
      await SystemApi.getRoleUserAdd({ userId: userId.value, roleIdList: roleIds.value })
      ElMessage.success('修改成功')
    }
    emit('refresh')
    onClose()
  }

  const roleIds = ref([])
  const visible = ref(false)
  const onOpen = (item) => {
    if (item) {
      // 将item中id 赋值给userId
      userId.value = item.id
      // 获取用户角色列表
      SystemApi.getRoleUserList({ userId: item.id }).then((res) => {
        // 将res赋值给roleIds
        roleIds.value = res
        // 遍历res 如果res中的id等于page.list中的id 就将page.list中的id选中
        res.forEach((item) => {
          for (let i = 0; i < page.list.length; i++) {
            if (item == page.list[i].id) {
              tableRef.value.toggleRowSelection(page.list[i], true)
            }
          }
        })
      })
    }
    visible.value = true
  }

  defineExpose({ onOpen })
  const onClose = () => {
    visible.value = false
    // clearSelection 清空多选
    tableRef.value.clearSelection()
  }
  const { page, query, handleQuery, resetQuery } = useTable({
    page: SystemApi.getRolePage
  })
</script>

<style scoped lang="scss"></style>
