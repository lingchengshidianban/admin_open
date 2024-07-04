<template>
  <el-card style="margin-top: 20px">
    <template #header>最近14天人数统计</template>
    <el-skeleton :count="7" :loading="props.loading" :animated="true">
      <template #template>
        <el-skeleton-item style="height: 16px" />
      </template>
      <template #default>
        <!--       <template #default> 不会被dom渲染到-->
        <!--        这里不能用id，因为getElementById获取不到-->
        <div ref="axis" style="height: 300px; margin: 0 auto; text-align: center"></div>
      </template>
    </el-skeleton>
  </el-card>
</template>

<script setup>
import * as echarts from 'echarts'
import { statApi } from '@/api/dashboard.js'
import { ref, watch } from 'vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: true
  }
})

const axis = ref()
watch(
  axis,
  (newVal) => {
    if (newVal) {
      option()
    }
  },
  {
    immediate: true
  }
)

const option = async () => {
  let myChart = echarts.init(axis.value)
  const data = await statApi.login()
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['活跃人数', '新增人数']
    },
    xAxis: {
      type: 'category',
      data: data.dateList
    },

    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '活跃人数',
        type: 'line',
        data: data.loginList,
        areaStyle: {
          color: '#f6faff'
        }
      },
      {
        name: '新增人数',
        type: 'line',
        data: data.registerList
      }
    ]
  }
  myChart.setOption(option)
}
</script>
