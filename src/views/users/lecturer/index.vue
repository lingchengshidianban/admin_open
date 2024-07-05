<template>
  <el-form :model="query" inline>
    <el-form-item><el-input v-model="query.lecturerName" /></el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleQuery">查询</el-button>
      <el-button @click="resetQuery">重置</el-button>
      <el-button type="primary" @click="handleES">同步ES</el-button>
    </el-form-item>
  </el-form>
  <div style="margin: 20px 0"><el-button @click="onOpenForm()">添加讲师</el-button></div>
  <el-table v-loading="page.loading" :data="page.list" row-key="id" class="drag-table">
    <el-table-column label="讲师信息">
      <template #default="scope">
        <img :src="scope.row.lecturerHead" alt="" style="width: 40px; height: 40px; border-radius: 50%; margin-right: 10px; vertical-align: middle" />
        <span>{{ scope.row.lecturerName }}</span>
      </template>
    </el-table-column>
    <el-table-column label="职位">
      <template #default="scope">
        <span>{{ scope.row.lecturerPosition }}</span>
      </template>
    </el-table-column>
    <el-table-column label="状态">
      <template #default="scope">
        <EnumView :enum-value="scope.row.statusId" :enum-name="'StatusIdEnum'" />
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template #default="scope">
        <el-button v-permission="'lecturer:edit'" type="primary" text @click="onOpenForm(scope.row)">编辑</el-button>
        <el-divider direction="vertical" />
        <el-dropdown>
          <el-button type="primary" text>更多操作</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <el-button v-permission="'lecturer:delete'" type="danger" text @click="handleDelete(scope.row)">删除</el-button>
              </el-dropdown-item>
              <el-dropdown-item @click="handleStatus(scope.row)">
                <el-button v-if="scope.row.statusId === 1" text type="primary">禁用</el-button>
                <el-button v-if="scope.row.statusId === 0" text type="primary">启用</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
  <LecturerForm ref="formRef" @refresh="handlePage" />
</template>

<script setup>
import { usersApi } from '@/api/users.js'
import { ref } from 'vue'
import useTable from '@/utils/table.js'
import { ElMessageBox } from 'element-plus'
import EnumView from '@/components/Enum/View/index.vue'
import LecturerForm from './LecturerForm.vue'

const handleES = async () => {
  ElMessageBox.confirm('是否同步ES?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await usersApi.teacherEsSync()
  })
}
const formRef = ref()
const onOpenForm = (row) => {
  formRef.value.onOpen(row)
}

const { query, page, handleQuery, resetQuery, handleDelete, handlePage, handleStatus } = useTable({
  page: usersApi.teacherPage,
  delete: usersApi.teacherDelete,
  status: usersApi.teacherUpdate,
  sort: usersApi.teacherSort
})
</script>

<style scoped lang="scss"></style>
