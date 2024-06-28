<template>
  <el-form :model="query" inline>
    <el-form-item label-width="100">
      <el-input v-model="query.linkName" placeholder="请输入名称" prefix-icon="search" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleQuery()">查询</el-button>
      <el-button type="primary" @click="resetQuery()">重置</el-button>
    </el-form-item>
  </el-form>
  <div>
    <el-button v-permission="'website:link:save'" type="primary" style="margin-bottom: 20px" @click="openFormModel()">添加</el-button>
  </div>
  <el-table :data="page.list" row-key="id" class="drag-table">
    <el-table-column label="名称" min-width="80" prop="linkName"></el-table-column>
    <el-table-column label="链接" min-width="120">
      <template #default="scope">
        <el-link :href="scope.row.linkUrl" target="_blank" type="primary">{{ scope.row.linkUrl }}</el-link>
      </template>
    </el-table-column>
    <el-table-column label="跳转方式" min-width="120">
      <template #default="scope">
        <EnumView :enum-value="scope.row.linkTarget" :enum-name="'TargetEnum'" />
      </template>
    </el-table-column>
    <el-table-column label="状态" min-width="80">
      <template #default="scope">
        <EnumView :enum-value="scope.row.statusId" :enum-name="'StatusIdEnum'" />
      </template>
    </el-table-column>
    <el-table-column label="操作" :min-width="60">
      <template #default="scope">
        <el-button v-permission="'website:link:edit'" text type="primary" @click="openFormModel(scope.row)">编辑</el-button>
        <el-divider direction="vertical" />
        <el-dropdown>
          <el-button type="primary" text>更多</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button v-if="scope.row.statusId === 1" type="text" @click="handleStatus(scope.row)">禁用</el-button>
                <el-button v-else type="text" @click="handleStatus(scope.row)">启用</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
  <link-form ref="formRef" @refresh="handlePage" />
</template>

<script setup>
  import { ref } from 'vue'
  import useTable from '@/utils/table.js'
  import EnumView from '@/components/Enum/View/index.vue'
  import LinkForm from './LinkForm.vue'
  import { SystemApi } from '@/api/system.js'

  const formRef = ref()
  const openFormModel = (item) => {
    formRef.value.onOpen(item)
  }
  const { handleQuery, page, query, handlePage, resetQuery, handleStatus, handleDelete } = useTable({
    page: SystemApi.getFriendPage,
    delete: SystemApi.getFriendDelete,
    status: SystemApi.getFriendEdit,
    sort: SystemApi.getFriendSort
  })
</script>

<style scoped lang="scss"></style>
