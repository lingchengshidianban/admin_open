<template>
  <div class="error_wrapper">
    <img src="../assets/images/common/404.png" alt="" />
    <div>
      <h5>404</h5>
      <div>抱歉，您访问的页面不存在</div>
      <el-button type="primary" @click="handleJump">返回主页</el-button>
    </div>
  </div>
</template>

<script setup>
import { PATH } from '@/utils/constants/system.js'
import { useRouter } from 'vue-router'

const router = useRouter()

function handleJump() {
  router.push({ path: PATH.URL_DASHBOARD })
}
</script>

<style scoped lang="scss">
.error_wrapper {
  display: flex;
  align-items: center;
}
</style>
