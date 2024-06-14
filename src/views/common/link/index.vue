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
  <el-table :data="page.list">
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
  </el-table>
</template>

<script setup>
  import useTable from '@/utils/table.js'
  import EnumView from '@/components/Enum/View/index.vue'
  import { SystemApi } from '@/api/system.js'
  const { handleQuery, page, query, resetQuery } = useTable({
    page: SystemApi.getFriendPage
  })
</script>

<style scoped lang="scss"></style>
