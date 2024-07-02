<template>
  <div class="app-container">
    <el-form :model="query" inline>
      <el-form-item>
        <el-input v-model="query.orderNo" placeholder="根据订单号搜索" prefix-icon="search"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="query.mobile" placeholder="根据手机号码搜索" prefix-icon="search"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery()">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
  <el-table v-loading="page.loading" :data="page.list">
    <el-table-column label="商品信息" min-width="180">
      <template #default="scope">
        <div style="display: flex">
          <img :src="scope.row.courseViewVO.courseLogo" alt="商品图片" style="width: 90px; height: 50px; border-radius: 5px; vertical-align: middle" />
          <div style="margin-left: 10px">
            {{ scope.row.courseViewVO.courseName }}
            <br />
            <span v-if="scope.row.courseViewVO.isFree === 1">免费</span>
            <span v-if="scope.row.courseViewVO.isFree === 0">
              ￥{{ scope.row.courseViewVO.coursePrice }}
              <span style="text-decoration: line-through; margin-left: 10px">￥{{ scope.row.courseViewVO.rulingPrice }}</span>
            </span>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="订单号" prop="orderNo" min-width="80"></el-table-column>
    <el-table-column label="用户手机号" prop="mobile"></el-table-column>
    <el-table-column label="订单金额" min-width="50">
      <template #default="scope">
        <span>￥{{ scope.row.coursePrice }}</span>
      </template>
    </el-table-column>
    <el-table-column label="订单状态" prop="status" min-width="50">
      <template #default="scope">
        {{ scope.row.status === 1 ? '未支付' : '支付成功' }}
      </template>
    </el-table-column>
    <el-table-column label="客户备注" prop="remark" min-width="50"></el-table-column>
    <el-table-column label="支付方式/时间" min-width="80">
      <template #default="scope">
        <enum-view :enum-name="'PayTypeEnum'" :enum-value="scope.row.payType" />
        <br />
        <span v-if="scope.row.orderStatus === 2">{{ scope.row.payTime }}</span>
        <span v-else>{{ scope.row.gmtCreate }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" min-width="50">
      <template #default="scope">
        <el-button v-permission="'order:remark'" type="text" @click="openMode(scope.row)">写备注</el-button>
      </template>
    </el-table-column>
  </el-table>
  <Paging v-model:current-page="page.pageCurrent" v-model:page-size="page.pageSize" :total="page.totalCount" @pagination="handlePage" />
</template>

<script setup>
import useTable from '@/utils/table.js'
import EnumView from '@/components/Enum/View/index.vue'
import { usersApi } from '@/api/users.js'
import { ref } from 'vue'
import Paging from '@/components/Paging/index.vue'

const formRef = ref()
function openMode(row) {
  formRef.value.onOpen(row)
}

const { page, query, handleQuery, handlePage } = useTable({
  page: usersApi.orderInfoPage
})
</script>

<style scoped lang="scss">
.app-container {
  display: flex;
}
</style>
