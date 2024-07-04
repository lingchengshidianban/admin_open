<template>
  <!--面包屑-->
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">{{ item.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/modules/user.js'
import { useRoute } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'

const route = useRoute()

const breadcrumbList = computed(() => {
  let menuId = route.name
  if (!menuId) {
    return []
  }
  return useUserStore().getBreadcrumbMap.get(menuId)
})
</script>
