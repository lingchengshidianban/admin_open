<template>
  <el-card style="margin-top: 20px">
    <template #header> 最近14天人数统计 </template>
    <div id="axis" style="height: 400px; margin: 0 auto; text-align: center"></div>
  </el-card>
</template>

<script setup>
  import * as echarts from 'echarts'
  import { statApi } from '@/api/dashboard.js'
  import { onMounted } from 'vue'

  let myChart
  onMounted(() => {
    if (!myChart) {
      myChart = echarts.init(document.getElementById('axis'))
    }
    option()
  })
  const option = async () => {
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
          data: data.loginList
        },
        {
          name: '新增人数',
          type: 'line',
          data: data.registerList
        }
      ]
    }
    myChart?.setOption(option)
  }
</script>

<style scoped lang="scss"></style>
