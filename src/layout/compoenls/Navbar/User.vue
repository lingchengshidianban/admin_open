<template>
  <div style="display: flex; align-items: center; gap: 15px">
    <el-icon class="fullScreen_icon" size="20" @click="toggleFullScreen"><FullScreen /></el-icon>
    <el-link href="https://github.com/lingchengshidianban/admin_open.git" :underline="false">
      <svg t="1718944052282" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4419" width="30" height="30">
        <path
          d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9 23.5 23.2 38.1 55.4 38.1 91v112.5c0.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"
          p-id="4420"
        ></path>
      </svg>
    </el-link>
    <el-dropdown trigger="click">
      <div class="user_wrapper">
        <img src="@/assets/images/head.gif" alt="" class="user_avatar" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <div @click="handleInfo">{{ realName }}</div>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link to="/">
              <div>首页</div>
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <div @click="handelLogout">退出登录</div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ref, onMounted, onUnmounted } from 'vue'
import { useUserStore } from '@/stores/modules/user.js'
import { ElMessageBox } from 'element-plus'
import { PATH } from '@/utils/constants/system.js'
import { removeToken } from '@/utils/cookie.js'
import screenfull from 'screenfull' // 全屏插件

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

// 管理员信息
const handleInfo = () => {
  router.push({ path: '/users/info' })
}

// 全屏
const isFullscreen = ref(false)

const handleFullscreenChange = () => {
  isFullscreen.value = screenfull.isFullscreen
}
onMounted(() => {
  if (screenfull.isEnabled) {
    screenfull.on('change', handleFullscreenChange)
  }
})
onUnmounted(() => {
  if (screenfull.isEnabled) {
    screenfull.off('change', handleFullscreenChange)
  }
})
const toggleFullScreen = () => {
  if (!screenfull.isEnabled) {
    ElMessage.error('你的浏览器不支持全屏')
    return false
  }
  screenfull.toggle()
}
</script>

<style scoped lang="scss">
.fullScreen_icon {
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.1);
  }
}
.user_avatar {
  height: 40px;
  width: auto;
  border-radius: 50%;
  transition: transform 0.2s linear;
  &:hover {
    transform: rotate(360deg);
    animation: spic 0.1s linear infinite;
  }
}
@keyframes spic {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
