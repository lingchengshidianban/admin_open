<template>
  <el-main>
    <div class="main-container">
      <router-view v-slot="{ Component, route }">
        <component :is="Component" :key="route.path"></component>
      </router-view>
    </div>
  </el-main>
</template>

<script setup></script>

<style scoped lang="scss">
  .el-main {
    background-color: #f2f3f5;
    --el-main-padding: 20px 10px 10px;
    transition: margin-left 0.5s;

    .main-container {
      background-color: #fff;
      min-height: calc(100vh - 130px);
      padding: 20px;
      overflow: hidden;
    }
  }
</style>
