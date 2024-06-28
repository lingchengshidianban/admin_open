<template>
  <el-form inline :model="query">
    <el-form-item><el-input prefix-icon="search" placeholder="请输登录账号" /></el-form-item>
    <el-form-item><el-button type="primary">查询</el-button> <el-button>重置</el-button></el-form-item>
  </el-form>
  <el-table v-loading="page.loading" :data="page.list" row-key="id" class="drag-table">
    <el-table-column label="登录账号" prop="mobile" />
    <el-table-column label="姓名" prop="realName"></el-table-column>
    <el-table-column label="操作" prop="operation">
      <template #default="scope"
        ><span
          >{{ scope.row.operation }}<el-icon size="15" class="operator" @click="handleOpen(scope.row)"><Document /></el-icon></span
      ></template>
    </el-table-column>
    <el-table-column label="请求接口" prop="path" :min-width="100" />
    <el-table-column label="登录IP" prop="loginIp" />
    <el-table-column label="登录地址" prop="province">
      <template #default="scope"> {{ scope.row.province }} {{ scope.row.city }} </template>
    </el-table-column>
    <el-table-column label="时间" prop="gmtCreate" />
  </el-table>
  <Paging v-model:current-page="page.pageCurrent" v-model:page-size="page.pageSize" :total="page.totalCount" @pagination="handlePage" />
  <LogForm ref="showSet" />
</template>

<script setup>
  import { ref } from 'vue'
  import { SystemApi } from '@/api/system.js'
  import useTable from '@/utils/table.js'
  import LogForm from './LogForm.vue'
  import Paging from '@/components/Paging/index.vue'

  const showSet = ref()
  const handleOpen = (row) => {
    showSet.value.onOpen(row)
  }

  const { query, page, handlePage } = useTable({
    page: SystemApi.getLogPage
  })
</script>

<style scoped lang="scss">
  .operator {
    color: #2873f0;
    margin-left: 5px;
    cursor: pointer;
  }
</style>
