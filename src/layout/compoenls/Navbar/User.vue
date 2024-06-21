<template>
  <el-dropdown trigger="click">
    <div class="user_wrapper">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>
          <div>{{ realName }}</div>
        </el-dropdown-item>
        <el-dropdown-item>
          <div @click="handelLogout">退出登录</div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
    <el-dropdown-item></el-dropdown-item>
  </el-dropdown>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import { ref } from 'vue'
  import { useUserStore } from '@/stores/modules/user.js'
  import { ElMessageBox } from 'element-plus'
  import { PATH } from '@/utils/constants/system.js'
  import { removeToken } from '@/utils/cookie.js'

  const router = useRouter()
  const realName = ref(useUserStore().realName)

  const handelLogout = () => {
    ElMessageBox.confirm('是否退出登录？', '退出登录', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      removeToken()
      useUserStore().logout()
      await router.push({ path: PATH.URL_LOGIN })
    })
  }
</script>

<style scoped lang="scss">
  .user_wrapper {
    padding-right: 20px;
  }
</style>
