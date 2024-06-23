<template>
  <el-form :model="query" inline>
    <el-form-item prop="roleName">
      <el-input v-model="query.roleName" placeholder="请输入角色名称" prefix-icon="search" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleQuery()">查询</el-button>
      <el-button @click="resetQuery">重置</el-button>
      <el-button type="primary" @click="openForm">添加</el-button>
    </el-form-item>
  </el-form>

  <el-table :data="page.list">
    <el-table-column label="角色名称" prop="roleName"></el-table-column>
    <el-table-column label="备注" prop="remark"></el-table-column>
    <el-table-column label="状态" prop="statusId">
      <template #default="scope">
        <EnumView :enum-name="'StatusIdEnum'" :enum-value="scope.row.statusId" />
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary" text @click="openForm(scope.row)">编辑</el-button>
        <el-button type="primary" text @click="openRoleSet(scope.row)">分配菜单</el-button>
        <el-dropdown>
          <el-button type="primary" text>更多操作</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleStatus(scope.row)">
                <el-button v-if="scope.row.statusId === 1" type="primary" text>禁用</el-button>
                <el-button v-if="scope.row.statusId === 0" type="primary" text>启用</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button type="primary" text @click="handleDelete(scope.row)">删除</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
  <RoleForm ref="formRef" @refresh="handlePage" />
  <RoleSet ref="roleSetRef" @refresh="handlePage" />
</template>

<script setup>
  import useTable from '@/utils/table.js'
  import { SystemApi } from '@/api/system.js'
  import { ref } from 'vue'
  import RoleForm from './RoleForm.vue'
  import RoleSet from './RoleSet.vue'
  import EnumView from '@/components/Enum/View/index.vue'

  // 添加 / 修改
  const formRef = ref()
  const openForm = (row) => {
    formRef.value.onOpen(row)
  }

  // 角色设置
  const roleSetRef = ref()
  const openRoleSet = (row) => {
    roleSetRef.value.onOpen(row)
  }

  const { query, page, handleQuery, handlePage, resetQuery, handleStatus, handleDelete } = useTable({
    page: SystemApi.getRolePage,
    status: SystemApi.getRoleEdit,
    delete: SystemApi.getRoleDelete
  })
</script>

<style scoped lang="scss"></style>
