<template>
  <el-form :model="query" inline>
    <el-form-item>
      <enum-select v-model="query.appType" :enum-name="'AppTypeEnum'" placeholder="请选择应用类型" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleQuery">查询</el-button>
      <el-button @click="resetQuery">重置</el-button>
    </el-form-item>
  </el-form>
  <div style="margin: 20px 0">
    <el-button type="primary" @click="openFormModal">添加</el-button>
  </div>
  <el-table :data="page.list">
    <el-table-column :min-width="100" label="发布时间" prop="gmtCreate"> </el-table-column>
    <el-table-column :min-width="100" label="应用类型" prop="appType">
      <template #default="scope">
        <EnumView :enum-name="'AppTypeEnum'" :enum-value="scope.row.appType" />
      </template>
    </el-table-column>
    <el-table-column label="应用版本" prop="appVersion"></el-table-column>
    <el-table-column label="升级类型" prop="updateForce">
      <template #default="scope">
        <EnumView :enum-name="'UpdateForceEnum'" :enum-value="scope.row.updateForce" />
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="text" @click="openFormModal(scope.row)">编辑</el-button>
        <el-divider direction="vertical" />
        <el-dropdown>
          <el-button type="text">更多操作</el-button>
          <template #dropdown>
            <el-dropdown-item><el-button type="danger" text @click="handleDelete(scope.row)">删除</el-button></el-dropdown-item>
            <el-dropdown-item @click="handleStatus(scope.row)">
              <el-button v-if="scope.row.statusId === 1" type="primary" text>禁用</el-button>
              <el-button v-if="scope.row.statusId === 0" type="primary" text>启用</el-button>
            </el-dropdown-item>
          </template>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
  <AppForm ref="formRef" />
</template>

<script setup>
  import useTable from '@/utils/table.js'
  import { ref } from 'vue'
  import EnumView from '@/components/Enum/View/index.vue'
  import EnumSelect from '@/components/Enum/Select/index.vue'
  import AppForm from './AppForm.vue'
  import { SystemApi } from '@/api/system.js'

  const formRef = ref()
  const openFormModal = (item) => {
    formRef.value.onOpen(item)
  }

  const { page, query, handleQuery, resetQuery, handleDelete, handleStatus } = useTable({
    page: SystemApi.getAppVersionPage,
    status: SystemApi.getAppVersionEdit,
    delete: SystemApi.getAppVersionDelete
  })
</script>

<style scoped lang="scss"></style>
