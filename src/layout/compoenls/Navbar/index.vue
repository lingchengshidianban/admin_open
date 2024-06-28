<template>
  <el-header>
    <Logo />
    <div class="info">
      <Crumbs />
      <User />
    </div>
  </el-header>
</template>

<script setup>
  import Logo from '@/layout/compoenls/Navbar/Logo.vue'
  import Crumbs from '@/layout/compoenls/Navbar/Crumbs.vue'
  import User from '@/layout/compoenls/Navbar/User.vue'
</script>

<style scoped lang="scss">
  .el-header {
    position: fixed;
    padding: 0;
    width: 100%;
    z-index: 99;
    background-color: #fff;
    border-bottom: 1px solid #ebeef5;
    display: flex;
    .info {
      padding: 0 20px;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: space-between;
    }
  }
</style>
