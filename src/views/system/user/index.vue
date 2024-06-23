<template>
  <el-form inline :model="query">
    <el-form-item><el-input placeholder="请输入登录账号" /></el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleQuery()">查询</el-button>
      <el-button @click="resetQuery()">重置</el-button>
      <el-button type="primary" @click="onOpenForm">添加</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="page.list">
    <el-table-column label="登录账号" prop="mobile"></el-table-column>
    <el-table-column label="用户昵称" prop="realName"> </el-table-column>
    <el-table-column label="所属角色" prop="roleNameList"></el-table-column>
    <el-table-column label="备注" prop="remark"></el-table-column>
    <el-table-column label="状态" prop="statusId">
      <template #default="scope"> <EnumView :enum-value="scope.row.statusId" :enum-name="'StatusIdEnum'" /> </template
    ></el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary" text @click="onOpenForm(scope.row)">编辑</el-button>
        <el-divider direction="vertical" />
        <el-button type="primary" text @click="openRoleSet(scope.row)">角色分配</el-button>
        <el-divider direction="vertical" />
        <el-dropdown>
          <el-button type="primary" text>更多操作</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item><el-button type="primary" text @click="handleLogout(scope.row)">密码</el-button></el-dropdown-item>
              <el-dropdown-item><el-button type="danger" text @click="handleDelete(scope.row)">删除</el-button></el-dropdown-item>
              <el-dropdown-item @click="handleStatus(scope.row)"
                ><el-button v-if="scope.row.statusId === 1" type="primary" text>禁用</el-button>
                <el-button v-if="scope.row.statusId === 0" type="primary" text>启用</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
  <LogoutPaw ref="passwordRef" @refresh="handlePage" />
  <RoleSet v-if="roleVisible" ref="roleSetRef" @refresh="handleRole" />
  <UserForm ref="formRef" @refresh="handlePage" />
</template>

<script setup>
  import LogoutPaw from './LogoutPaw.vue'
  import useTable from '@/utils/table.js'
  import { SystemApi } from '@/api/system.js'
  import EnumView from '@/components/Enum/View/index.vue'
  import RoleSet from './RoleSet.vue'
  import UserForm from './UserForm.vue'
  import { ref, nextTick } from 'vue'

  const roleSetRef = ref()
  function openRoleSet(row) {
    roleVisible.value = true
    nextTick(() => {
      roleSetRef.value.onOpen(row)
    })
  }
  const roleVisible = ref(false)
  const handleRole = () => {
    roleVisible.value = false
    handlePage()
  }

  // 添加账号
  const formRef = ref()
  function onOpenForm(row) {
    formRef.value.onOpen(row)
  }

  const passwordRef = ref()
  function handleLogout(row) {
    passwordRef.value.onOpen(row)
  }

  const { query, handleQuery, handleStatus, handleDelete, resetQuery, page, handlePage } = useTable({
    page: SystemApi.getAdminPage,
    delete: SystemApi.getAdminDelete,
    status: SystemApi.getAdminEdit
  })
</script>

<style scoped lang="scss"></style>
