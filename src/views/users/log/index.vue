<template>
  <el-table :data="page.list" height="100%" border>
    ">
    <el-table-column label="手机号" prop="mobile" />
    <el-table-column label="登录IP" prop="loginIp" />
    <el-table-column label="登录地址" prop="province">
      <template #default="scope">
        <span>{{ scope.row.province }}</span>
        <span>{{ scope.row.city }}</span>
      </template>
    </el-table-column>
    <el-table-column label="登录客户端" prop="loginClient">
      <template #default="scope">
        <EnumView :enum-name="'LoginClientEnum'" :enum-value="scope.row.loginClient" />
      </template>
    </el-table-column>
    <el-table-column label="操作系统" prop="os" />
    <el-table-column label="浏览器" prop="browser" />
    <el-table-column label="登录时间" prop="gmtCreate" />
    <el-table-column label="登录状态" prop="loginStatus">
      <template #default="scope">
        <EnumView :enum-name="'LoginStatusEnum'" :enum-value="scope.row.loginStatus" />
      </template>
    </el-table-column>
  </el-table>
  <Paging v-model:current-page="page.pageCurrent" v-model:page-size="page.pageSize" :total="page.totalCount" @pagination="handlePage" />
</template>

<script setup>
import useTable from '@/utils/table.js'
import { usersApi } from '@/api/users.js'
import EnumView from '@/components/Enum/View/index.vue'
import Paging from '@/components/Paging/index.vue'

const { page, handlePage } = useTable({
  page: usersApi.loginLogPage
})
</script>

<style scoped lang="scss"></style>
