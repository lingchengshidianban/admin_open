<template>
  <el-card style="margin-top: 20px">
    <template #header>视频云使用情况</template>
    <div class="cache_pie">
      <div id="cachePieTwo" ref="pieOneRef" class="axis"></div>
      <div id="cachePieOne" ref="pieTwoRef" class="axis"></div>
    </div>
  </el-card>
</template>

<script setup>
  import * as echarts from 'echarts'
  import { onMounted, ref, reactive } from 'vue'
  import { statApi } from '@/api/dashboard'

  const chart = reactive({
    cachePieTwo: null,
    cachePieOne: null
  })
  const pieOneRef = ref()
  const pieTwoRef = ref()
  onMounted(() => {
    if (!chart.cachePieTwo) {
      chart.cachePieTwo = echarts.init(pieOneRef.value)
    }
    if (!chart.cachePieOne) {
      chart.cachePieOne = echarts.init(pieTwoRef.value)
    }
    statApi.vod().then((res) => {
      initChartOne(res)
      initChartTwo(res)
    })
  })
  const initChartOne = (data) => {}
  const initChartTwo = (data) => {}
</script>

<style scoped lang="scss"></style>
