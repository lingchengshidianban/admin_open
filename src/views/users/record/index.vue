<template>
  <div style="font-size: 18px">用户信息</div>
  <el-row :gutter="20" style="margin: 20px 0" align="middle">
    <el-col :span="6">
      <img :src="userInfo.userHead" alt="" style="width: 60px; height: 60px; border-radius: 50%; vertical-align: middle" />
      <span style="margin-left: 10px">{{ userInfo.nickname }}</span>
    </el-col>
    <el-col :span="6">
      <span>手机号：{{ userInfo.mobile }}</span>
    </el-col>
    <el-col :span="6">
      <span>账号余额：{{ userInfo.usersAccountViewResp?.availableAmount }}￥</span>
    </el-col>
    <el-col :span="6">
      <span>出生日期：{{ userInfo.userAge }}</span>
    </el-col>
  </el-row>
  <div style="height: 20px"></div>
  <div style="font-size: 18px">其他信息</div>
  <el-row :gutter="20" style="margin: 20px 0" align="middle">
    <el-col :span="6">
      <span>注册来源：</span>
      <enum-view :enum-name="'RegisterSourceEnum'" :enum-value="userInfo.registerSource" />
    </el-col>
    <el-col :span="6">
      <span v-if="userInfo.remark === null">备注：---</span>
      <span v-else>{{ userInfo.remark }}</span>
    </el-col>
    <el-col :span="6">
      <span>账号状态：</span>
      <enum-view :enum-name="'StatusIdEnum'" :enum-value="userInfo.statusId"></enum-view>
    </el-col>
    <el-col :span="6">
      <span v-if="userInfo.province === null">地址：---</span>
      <span v-else>{{ userInfo.province }}</span>
    </el-col>
  </el-row>
  <div style="height: 20px"></div>
  <div style="font-size: 18px">数据统计</div>
  <el-row :gutter="20" style="margin: 20px 0" align="middle">
    <el-col :span="6">
      <span>购买课程数：{{ orderStatistics.courseBuySum }}</span>
    </el-col>
    <el-col :span="6">
      <span v-if="orderStatistics.courseBuyMoney === null">消费总金额：---</span>
      <span v-else>消费总金额：{{ orderStatistics.courseStudySum }}￥</span>
    </el-col>
    <el-col :span="6">
      <span v-if="studyStatistics.courseStudyDuration === null">学习课程数：---</span>
      <span v-else>学习课程数：{{ studyStatistics.courseStudyDuration }}</span>
    </el-col>
    <el-col :span="6">
      <span>学习课程总数量：{{ studyStatistics.courseStudySum }}</span>
    </el-col>
  </el-row>
  <el-tabs v-model="activeName" style="margin-top: 30px">
    <el-tab-pane label="购买记录">
      <RecordOrder />
    </el-tab-pane>
    <el-tab-pane label="学习记录">
      <Study />
    </el-tab-pane>
    <el-tab-pane label="账号记录">
      <Account />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import EnumView from '@/components/Enum/View/index.vue'
  import { usersApi } from '@/api/users.js'
  import RecordOrder from './RecordOrder.vue'
  import Study from './Study.vue'
  import Account from './Account.vue'

  const route = useRoute()
  const userInfo = ref({})
  const orderStatistics = ref({})
  const studyStatistics = ref({})
  onMounted(() => {
    usersApi.userInfo({ id: route.query.userId }).then((res) => {
      userInfo.value = res
    })
    // 订单统计
    usersApi.orderStatistics({ userId: route.query.userId }).then((res) => {
      orderStatistics.value = res
    })
    usersApi.studyStatistics({ userId: route.query.userId }).then((res) => {
      studyStatistics.value = res
    })
  })
</script>

<style scoped lang="scss"></style>
