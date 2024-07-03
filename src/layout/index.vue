<template>
  <el-container>
    <navbar />
  </el-container>
  <el-scrollbar>
    <el-container class="container">
      <sidebar />
      <mains />
    </el-container>
  </el-scrollbar>
</template>

<script setup>
import Navbar from '@/layout/compoenls/Navbar/index.vue'
import { useWebsiteStore } from '@/stores/modules/website.js'
import { onMounted } from 'vue'
import Sidebar from '@/layout/compoenls/Sidebar/index.vue'
import Mains from '@/layout/compoenls/Mains.vue'
onMounted(() => {
  useWebsiteStore().init()
})
</script>

<style scoped lang="scss">
.el-scrollbar {
  width: 100%;
}
.container {
  margin-top: 50px;
}
</style>
