<template>
  <el-card style="margin-top: 20px">
    <template #header>视频云使用情况</template>
    <div class="cache_pie">
      <div class="cache_layout">
        <el-skeleton :loading="props.loading" style="width: 90%" :count="7" :animated="true">
          <template #template>
            <el-skeleton-item :variant="'text'" style="height: 16px" />
          </template>
          <template #default>
            <div id="cachePieTwo" ref="pieOneRef" class="axis"></div>
          </template>
        </el-skeleton>
      </div>
      <div class="cache_layout">
        <el-skeleton :loading="props.loading" :count="7" style="width: 90%" :animated="true">
          <template #template>
            <el-skeleton-item :variant="'text'" style="height: 16px" />
          </template>
          <template #default>
            <div id="cachePieOne" ref="pieTwoRef" class="axis"></div>
          </template>
        </el-skeleton>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, ref, watch } from 'vue'
import { statApi } from '@/api/dashboard'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})

const pieOneRef = ref()
const pieTwoRef = ref()

watch(
  pieOneRef,
  (newVal) => {
    if (newVal) {
      statApi.vod().then((res) => {
        initChartOne(res)
        initChartTwo(res)
      })
    }
  },
  {
    immediate: true
  }
)
onMounted(() => {})
const initChartOne = (data) => {
  let cachePieTwo = echarts.init(pieOneRef.value)
  const totalFlow = data.totalFlow
  const usedFlow = data.usedFlow ? data.usedFlow.toFixed(2) : 0
  const surplusFlow = (totalFlow - usedFlow).toFixed(2)
  const option1 = {
    title: {
      text: '流量使用情况',
      subtext: `总流量:${totalFlow}GB`,
      subtextStyle: {
        color: '#FF8C00',
        fontsize: '12'
      },
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a}<br />{b}{c}' + 'GB'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      formatter(name) {
        let data = option1.series[0].data
        let tarValue
        for (let i = 0; i < data.length; i++) {
          if (data[i].name === name) {
            tarValue = data[i].value
          }
        }
        const v = tarValue
        return `${name}${v}GB`
      }
    },
    series: [
      {
        name: `总流量: ${totalFlow}GB`,
        type: 'pie',
        radius: '50%',
        data: [
          { value: usedFlow, name: `已用`, itemStyle: { color: '#FF8C00' } },
          { value: surplusFlow, name: `剩余`, itemStyle: { color: '#00bf8f' } }
        ],
        label: {
          itemStyle: {
            show: true,
            position: 'top',
            formatter: '{d}%'
          }
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        itemStyle: {
          borderWidth: 0.5,
          borderColor: '#fff'
        }
      }
    ]
  }
  cachePieTwo?.setOption(option1)
}
const initChartTwo = (data) => {
  let cachePieOne = echarts.init(pieTwoRef.value)
  const totalSpace = data.totalSpace
  const usedSpace = data.usedSpace ? data.usedSpace.toFixed(2) : 0
  const surplusSpace = (totalSpace - usedSpace).toFixed(2)
  const option2 = {
    title: {
      text: '空间使用情况',
      subtext: `总空间:${totalSpace}GB`,
      subtextStyle: {
        color: '#FF8C00',
        fontsize: '12'
      },
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a}<br />{b}{c}' + 'GB'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      formatter(name) {
        let data = option2.series[0].data
        let tarValue
        for (let i = 0; i < data.length; i++) {
          if (data[i].name === name) {
            tarValue = data[i].value
          }
        }
        const v = tarValue
        return `${name}${v}GB`
      }
    },
    series: [
      {
        name: `总空间: ${totalSpace}GB`,
        type: 'pie',
        radius: '50%',
        data: [
          { value: usedSpace, name: `已用`, itemStyle: { color: '#FF8C00' } },
          { value: surplusSpace, name: `剩余`, itemStyle: { color: '#00bf8f' } }
        ],
        label: {
          itemtype: {
            show: true,
            formatter: '{d}%'
          }
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        itemStyle: {
          borderWidth: 0.5,
          borderColor: '#fff'
        }
      }
    ]
  }
  cachePieOne?.setOption(option2)
}
</script>

<style scoped lang="scss">
.cache_pie {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  .cache_layout {
    width: 50%;
    text-align: center;
    .axis {
      width: 45%;
      height: 280px;
      display: inline-block;
    }
  }
}
</style>
