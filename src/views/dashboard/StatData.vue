<template>
  <el-card class="info">
    <template #header>
      <div class="card-header">
        <span>数据统计</span>
      </div>
    </template>
    <el-row>
      <el-col :span="6">
        <router-link to="/common/order">
          <el-statistic title="今日订单数" :value="statData.todayOrder"></el-statistic>
        </router-link>
      </el-col>
      <el-col :span="6">
        <router-link to="/common/order">
          <el-statistic title="今日收入" :precision="2" :value="statData.todayMoney" prefix="￥"></el-statistic>
        </router-link>
      </el-col>
      <el-col :span="6">
        <router-link to="/common/order">
          <el-statistic title="昨日订单数" :value="statData.yesterdayOrder"></el-statistic>
        </router-link>
      </el-col>
      <el-col :span="6">
        <router-link to="/common/order">
          <el-statistic title="昨天收入" :value="statData.yesterdayMoney" :precision="2" prefix="￥"></el-statistic>
        </router-link>
      </el-col>
    </el-row>
    <br />
    <el-row>
      <el-col :span="6">
        <router-link to="/common/order">
          <el-statistic title="总用户数" :value="statData.userSum"></el-statistic>
        </router-link>
      </el-col>
      <el-col :span="6">
        <router-link to="/common/order">
          <el-statistic title="课程总数" :value="statData.courseSum"></el-statistic>
        </router-link>
      </el-col>
      <el-col :span="6">
        <router-link to="">
          <el-statistic title="订单总数" :value="statData.orderSum"></el-statistic>
        </router-link>
      </el-col>
      <el-col :span="6">
        <router-link to="">
          <el-statistic title="总收入" :value="statData.orderMoney" prefix="￥" :precision="2"></el-statistic>
        </router-link>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { statApi } from '@/api/dashboard.js'

  const statData = ref({})
  onMounted(() => {
    statApi.data().then((res) => {
      statData.value = res
    })
  })
</script>

<style scoped lang="scss">
  .info {
    padding: 15px;
    border-radius: 5px;
    font-size: 16px;
  }
</style>
