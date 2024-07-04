<template>
  <el-row :gutter="20">
    <el-col v-if="hasPermission('stat:data')">
      <StatData :loading="loading" />
    </el-col>
  </el-row>
  <div v-if="hasPermission('stat:login')">
    <StatLogin :loading="loading" />
  </div>
  <div v-if="hasPermission('stat:vod')">
    <StatVod :loading="loading" />
  </div>
</template>

<script setup>
import { hasPermission } from '@/utils/permission.js'
import StatData from './StatData.vue'
import StatLogin from './StatLogin.vue'
import StatVod from './StatVod.vue'
import { ref } from 'vue'

const loading = ref(true)

setTimeout(() => {
  loading.value = false
}, 1500)
</script>
