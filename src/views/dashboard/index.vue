<template>
  <el-row :gutter="20">
    <el-col v-if="hasPermission('stat:data')" :span="16">
      <StatData />
    </el-col>
  </el-row>
  <div v-if="hasPermission('stat:login')">
    <StatLogin />
  </div>
  <div v-if="hasPermission('stat:vod')">
    <StatVod />
  </div>
</template>

<script setup>
  import { hasPermission } from '@/utils/permission.js'
  import StatData from './StatData.vue'
  import StatLogin from './StatLogin.vue'
  import StatVod from './StatVod.vue'
</script>

<style scoped lang="scss"></style>
