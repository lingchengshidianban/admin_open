<template>
  <el-form inline :model="query.data">
    <el-form-item>
      <el-input v-model="query.navTitle" placeholder="请输入导航标题" prefix-icon="search" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleQuery()">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="resetQuery()">重置</el-button>
    </el-form-item>
  </el-form>
  <div style="margin-bottom: 20px">
    <el-button type="primary" @click="openFormModal()">添加导航</el-button>
  </div>
  <el-table v-loading="page.loading" :data="page.list">
    <el-table-column :min-width="120" prop="navTitle" label="导航标题"></el-table-column>
    <el-table-column :min-width="120" label="导航链接">
      <template #default="scope">
        <el-link :href="scope.row.navUrl" target="_blank" type="primary">{{ scope.row.navUrl }}</el-link>
      </template>
    </el-table-column>
    <el-table-column :min-width="120" label="跳转方式">
      <template #default="scope">
        <enum-view :enum-name="'TargetEnum'" :enum-value="scope.row.navTarget" />
      </template>
    </el-table-column>
    <el-table-column :min-width="120" label="状态">
      <template #default="scope">
        <enum-view :enum-name="'StatusIdEnum'" :enum-value="scope.row.statusId" />
      </template>
    </el-table-column>
    <el-table-column :min-width="120" label="操作">
      <template #default="scope">
        <el-button type="primary" text>编辑</el-button>
        <el-divider direction="vertical" />
        <el-dropdown>
          <el-button type="primary" text>更多操作</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item><el-button text type="primary" @click="handleDelete(scope.row)">删除</el-button></el-dropdown-item>
            </el-dropdown-menu>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleStatus(scope.row)"
                ><el-button v-if="scope.row.statusId === 1" v-permission="'website:nav:edit'" text type="primary">禁用</el-button
                ><el-button v-if="scope.row.statusId === 0" v-permission="'website:nav:edit'" text type="primary">启用</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
  <NavigationForm ref="formRef" @refresh="handleQuery" />
</template>

<script setup>
  import useTable from '@/utils/table.js'
  import { SystemApi } from '@/api/system.js'
  import { ref } from 'vue'
  import EnumView from '@/components/Enum/View/index.vue'
  import NavigationForm from './NavigationForm.vue'

  const { page, handleQuery, query, handleDelete, handleStatus, resetQuery } = useTable({
    page: SystemApi.getHeaderPage,
    delete: SystemApi.getHeaderDelete,
    status: SystemApi.getHeaderEdit
  })
  const formRef = ref()
  const openFormModal = (item) => {
    formRef.value.onOpen(item)
  }
</script>

<style scoped lang="scss"></style>
