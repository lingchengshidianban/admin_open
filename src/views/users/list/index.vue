<template>
  <el-form :model="query" label-width="80px" inline>
    <el-form-item>
      <el-input v-model="query.mobile" placeholder="请输入手机号" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleQuery">查询</el-button>
      <el-button @click="resetQuery">重置</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="page.list">
    <el-table-column label="手机号码" :min-width="50" prop="mobile"></el-table-column>
    <el-table-column label="用户信息" :min-width="70">
      <template #default="scope">
        <img :src="scope.row.userHead" alt="" style="width: 40px; height: 40px; border-radius: 50%" />
        <span>{{ scope.row.nickname }}</span>
      </template>
    </el-table-column>
    <el-table-column label="账户">
      <template #default="scope">
        <span>余额：￥{{ scope.row.usersAccountViewResp?.availableAmount }}元</span>
        <br />
        <span>冻结：￥{{ scope.row.usersAccountViewResp?.freezeAmount }}元</span>
      </template>
    </el-table-column>
    <el-table-column label="注册来源" prop="remark">
      <template #default="scope">
        <enum-view :enum-name="'RegisterSourceEnum'" :enum-value="scope.row.registerSource" />
      </template>
    </el-table-column>
    <el-table-column label="注册时间" prop="gmtCreate" />
    <el-table-column label="状态">
      <template #default="scope">
        <enum-view :enum-name="'StatusIdEnum'" :enum-value="scope.row.statusId" />
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button v-permission="'user:record'" type="primary" text @click="handleData(scope.row)">数据</el-button>
        <el-divider direction="vertical" />
        <el-dropdown>
          <el-button text type="primary">更多操作</el-button>
          <template #dropdown>
            <el-dropdown-item>
              <el-button text type="primary">编辑</el-button>
            </el-dropdown-item>
            <el-dropdown-item @click="handleStatus(scope.row)">
              <el-button v-if="scope.row.statusId === 1" text type="primary">禁用</el-button>
              <el-button v-if="scope.row.statusId === 0" text type="primary">启动</el-button>
            </el-dropdown-item>
          </template>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
  import useTable from '@/utils/table.js'
  import { usersApi } from '@/api/users.js'
  import EnumView from '@/components/Enum/View/index.vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()

  const handleData = (row) => {
    router.push({ path: '/users/record', query: { userId: row.id } })
  }

  const { query, page, handleStatus, handleQuery, resetQuery } = useTable({
    page: usersApi.userPage,
    status: usersApi.userEdit
  })
</script>

<style scoped lang="scss"></style>
