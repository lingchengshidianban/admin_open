<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="item in tabPanes" :key="item.configType" :label="item.label" :name="item.configType">
        <List :config-type="item.configType" :list="page.list" @refresh="handlePage" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup>
  import { ref } from 'vue'
  import List from './List.vue'
  import { SystemApi } from '@/api/system'
  import useTable from '@/utils/table'

  // 切换tab
  const handleClick = (tab) => {
    query.configType = tab.props.name
    handlePage()
  }
  const activeName = ref(1)

  const { page, handlePage, query } = useTable({
    page: SystemApi.sysConfigList
  })

  const tabPanes = [
    {
      label: '站点设置',
      configType: 1
    },
    {
      label: '登录设置',
      configType: 2
    },
    {
      label: '视频设置',
      configType: 3
    },
    {
      label: '存储设置',
      configType: 4
    },
    {
      label: '短信设置',
      configType: 5
    },
    {
      label: '支付设置',
      configType: 6
    }
  ]
</script>
