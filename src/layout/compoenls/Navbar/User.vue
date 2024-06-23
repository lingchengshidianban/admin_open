<template>
  <div style="display: flex; align-items: center; gap: 15px">
    <el-icon class="fullScreen_icon" size="20" @click="toggleFullScreen"><FullScreen /></el-icon>
    <el-icon class="love" size="40"
      ><svg t="1719024058714" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4284" width="20" height="20">
        <path
          d="M512 901.746939c-13.583673 0-26.122449-4.179592-37.093878-13.061225-8.881633-7.314286-225.697959-175.020408-312.424489-311.379592C133.746939 532.37551 94.040816 471.24898 94.040816 384.522449c0-144.718367 108.146939-262.269388 240.326531-262.269388 67.395918 0 131.657143 30.82449 177.632653 84.636735 45.453061-54.334694 109.191837-84.636735 177.110204-84.636735 132.702041 0 240.326531 117.55102 240.326531 262.269388 0 85.159184-37.093878 143.673469-67.395919 191.216327l-1.044898 1.567346c-86.726531 136.359184-303.542857 304.587755-312.424489 311.379592-10.44898 8.359184-22.987755 13.061224-36.571429 13.061225z"
          fill="#E5404F"
          p-id="4285"
        ></path></svg
    ></el-icon>
    <el-link href="https://github.com/lingchengshidianban/admin_open.git" :underline="false"
      ><svg t="1718944052282" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4419" width="30" height="30">
        <path
          d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9 23.5 23.2 38.1 55.4 38.1 91v112.5c0.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"
          p-id="4420"
        ></path></svg
    ></el-link>
    <el-dropdown trigger="click">
      <div class="user_wrapper">
        <img src="@/assets/images/head.gif" alt="" style="height: 40px; width: auto; border-radius: 50%" />
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

  .love {
    font-size: 30px;
    animation-name: scaleDraw;
    animation-duration: 0.5s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out; // 匀速
  }
  @keyframes scaleDraw {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
  .user_wrapper {
    padding-right: 20px;
  }
</style>
