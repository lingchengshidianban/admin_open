<template>
  <el-card class="info">
    <template #header>
      <div class="card-header">
        <span>数据统计</span>
      </div>
    </template>
    <el-row :gutter="120">
      <el-col :span="6">
        <el-skeleton :animated="true" :loading="props.loading">
          <template #template>
            <el-skeleton-item :variant="'text'" style="height: 16px"></el-skeleton-item>
            <el-skeleton-item :variant="'text'" style="height: 16px"></el-skeleton-item>
            <el-skeleton-item :variant="'text'" style="height: 16px; width: 50%"></el-skeleton-item>
          </template>
          <router-link to="/common/order">
            <div class="col-title">今日订单数</div>
            <count-up class="col-item" :end-val="10000" />
          </router-link>
        </el-skeleton>
      </el-col>
      <el-col :span="6">
        <el-skeleton :animated="true" :loading="props.loading">
          <template #template>
            <el-skeleton-item :variant="'text'" style="height: 16px"></el-skeleton-item>
            <el-skeleton-item :variant="'text'" style="height: 16px"></el-skeleton-item>
            <el-skeleton-item :variant="'text'" style="height: 16px; width: 50%"></el-skeleton-item>
          </template>
          <router-link to="/common/order">
            <div class="col-title">今日收入</div>
            <count-up class="col-item" :end-val="19999">
              <template #suffix>
                <span class="col-price">￥</span>
              </template>
            </count-up>
          </router-link>
        </el-skeleton>
      </el-col>
      <el-col :span="6">
        <el-skeleton :animated="true" :loading="props.loading">
          <template #template>
            <el-skeleton-item :variant="'text'" style="height: 16px"></el-skeleton-item>
            <el-skeleton-item :variant="'text'" style="height: 16px"></el-skeleton-item>
            <el-skeleton-item :variant="'text'" style="height: 16px; width: 50%"></el-skeleton-item>
          </template>
          <router-link to="/common/order">
            <div class="col-title">昨日订单数</div>
            <count-up class="col-item" :end-val="999">
              <template #suffix>+</template>
            </count-up>
          </router-link>
        </el-skeleton>
      </el-col>
      <el-col :span="6">
        <el-skeleton :animated="true" :loading="props.loading">
          <template #template>
            <el-skeleton-item :variant="'text'" style="height: 16px"></el-skeleton-item>
            <el-skeleton-item :variant="'text'" style="height: 16px"></el-skeleton-item>
            <el-skeleton-item :variant="'text'" style="height: 16px; width: 50%"></el-skeleton-item>
          </template>
          <router-link to="/common/order">
            <div class="col-title">昨天收入</div>
            <count-up class="col-item" :end-val="10999">
              <template #suffix>￥</template>
            </count-up>
          </router-link>
        </el-skeleton>
      </el-col>
    </el-row>
    <br />
    <el-row :gutter="120">
      <el-col :span="6">
        <el-skeleton :animated="true" :loading="props.loading">
          <template #template>
            <el-skeleton-item :variant="'text'" style="height: 16px"></el-skeleton-item>
            <el-skeleton-item :variant="'text'" style="height: 16px"></el-skeleton-item>
            <el-skeleton-item :variant="'text'" style="height: 16px; width: 50%"></el-skeleton-item>
          </template>
          <router-link to="/common/order">
            <div class="col-title">总用户数</div>
            <count-up class="col-item" :end-val="statData.userSum"></count-up>
          </router-link>
        </el-skeleton>
      </el-col>
      <el-col :span="6">
        <el-skeleton :animated="true" :loading="props.loading">
          <template #template>
            <el-skeleton-item :variant="'text'" style="height: 16px"></el-skeleton-item>
            <el-skeleton-item :variant="'text'" style="height: 16px"></el-skeleton-item>
            <el-skeleton-item :variant="'text'" style="height: 16px; width: 50%"></el-skeleton-item>
          </template>
          <router-link to="/common/order">
            <div class="col-title">课程总数</div>
            <count-up class="col-item" :end-val="statData.courseSum"></count-up>
          </router-link>
        </el-skeleton>
      </el-col>
      <el-col :span="6">
        <el-skeleton :animated="true" :loading="props.loading">
          <template #template>
            <el-skeleton-item :variant="'text'" style="height: 16px"></el-skeleton-item>
            <el-skeleton-item :variant="'text'" style="height: 16px"></el-skeleton-item>
            <el-skeleton-item :variant="'text'" style="height: 16px; width: 50%"></el-skeleton-item>
          </template>
          <router-link to="">
            <div class="col-title">订单总数</div>
            <count-up class="col-item" :end-val="statData.orderSum"></count-up>
          </router-link>
        </el-skeleton>
      </el-col>
      <el-col :span="6">
        <el-skeleton :animated="true" :loading="props.loading">
          <template #template>
            <el-skeleton-item :variant="'text'" style="height: 16px"></el-skeleton-item>
            <el-skeleton-item :variant="'text'" style="height: 16px"></el-skeleton-item>
            <el-skeleton-item :variant="'text'" style="height: 16px; width: 50%"></el-skeleton-item>
          </template>
          <router-link to="">
            <div class="col-title">总收入</div>
            <count-up class="col-item" :end-val="9999999">
              <template #suffix>￥</template>
            </count-up>
          </router-link>
        </el-skeleton>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CountUp from 'vue-countup-v3'
import { statApi } from '@/api/dashboard.js'

const props = defineProps({
  loading: {
    type: Boolean,
    default: true
  }
})

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

.col-title {
  color: rgba(0, 0, 0, 0.45);
  font-weight: 700;
}
.col-item {
  font-size: 20px;
  font-weight: 700;
  color: #666;
}
.col-price {
  font-size: 16px;
}
</style>
