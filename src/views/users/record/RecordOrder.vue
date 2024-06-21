<template>
  <el-form :model="query" inline label-width="80px">
    <el-form-item>
      <el-input prefix-icon="search" placeholder="根据订单号搜索" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleQuery">查询</el-button>
      <el-button @click="resetQuery">重置</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="page.list">
    <el-table-column label="商品信息"></el-table-column>
    <el-table-column label="订单号" prop="orderNo"></el-table-column>
    <el-table-column label="实付金额"></el-table-column>
    <el-table-column label="支付方式/时间"></el-table-column>
    <el-table-column label="订单状态"></el-table-column>
    <el-table-column label="客户/备注"></el-table-column>
    <el-table-column label="操作"></el-table-column>
  </el-table>
</template>

<script setup>
  import useTable from '@/utils/table.js'
  import { usersApi } from '@/api/users.js'
  import { useRoute } from 'vue-router'
  const route = useRoute()

  const { query, page, handleQuery, resetQuery } = useTable(
    {
      page: usersApi.orderPage
    },
    {
      userId: route.params.userId
    }
  )
</script>

<style scoped lang="scss"></style>
