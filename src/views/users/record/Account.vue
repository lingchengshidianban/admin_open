<template>
  <el-form inline>
    <el-form-item><el-input v-model="query.orderNo" placeholder="请输入订单号" /></el-form-item>
    <el-form-item inline>
      <el-button type="primary" @click="handleQuery">查看</el-button>
      <el-button @click="resetQuery">重置</el-button>
      <el-button @click="openFormModel">添加余额</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="page.list">
    <el-table-column label="时间" prop="gmtCreate"></el-table-column>
    <el-table-column label="消费类型" prop="consumeType">
      <template #default="scope">
        <enum-view :enum-name="'ConsumeTypeEnum'" :enum-value="scope.row.consumeType" />
      </template>
    </el-table-column>
    <el-table-column label="金额" prop="consumeAmount"></el-table-column>
    <el-table-column label="余额" prop="balanceAmount"></el-table-column>
    <el-table-column label="备注" prop="remark"></el-table-column>
    <el-table-column label="订单号" prop="orderNo"></el-table-column>
  </el-table>
  <consumeForm ref="saveForm" @refresh="handlePage" />
</template>

<script setup>
  import { usersApi } from '@/api/users.js'
  import useTable from '@/utils/table.js'
  import { ref } from 'vue'
  import consumeForm from './consumeForm.vue'
  import EnumView from '@/components/Enum/View/index.vue'
  import { useRoute } from 'vue-router/dist/vue-router'

  const route = useRoute()

  const saveForm = ref()
  const openFormModel = () => {
    saveForm.value.onOpen(route.query.userId)
  }
  const { page, query, handleQuery, handlePage, resetQuery } = useTable(
    {
      page: usersApi.usersAccountConsumePage
    },
    {
      usersId: route.query.id
    }
  )
</script>

<style scoped lang="scss"></style>
