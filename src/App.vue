<template>
  <el-config-provider :locale="zhCn">
    <router-view />
    <!--    上传-->
    <UploadFilePanel />
  </el-config-provider>
</template>
<script setup>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.js'
import UploadFilePanel from '@/components/Upload/File/Panel/index.vue'
</script>
