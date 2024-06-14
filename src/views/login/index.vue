<template>
  <div class="bg">
    <div class="login-content">
      <div class="login_info">
        <div class="title">
          <p>欢迎登录 领课教育系统（开源版）</p>
        </div>
        <div class="info">
          <p>
            领课教育系统(roncoo-education)是基于领课网络多年的在线教育平台开发和运营经验打造出来的产品，致力于打造一个各行业都适用的分布式在线教育系统。系统采用前后端分离模式，前台采用vue.js为核心框架，后台采用Spring
            Cloud为核心框架。系统目前主要功能有课程点播功能，支持多家视频云的接入，课程附件管理功能，支持多家存储云的接入，可以帮助个人或者企业快速搭建一个轻量级的在线教育平台。
          </p>
        </div>
        <div style="text-align: center; font-size: 10px">
          <img src="@/assets/images/weixin.jpg" alt="" style="width: 120px; height: auto" />
          <p style="text-align: center">关注微信公众号，可获取更多资料</p>
        </div>
      </div>
      <div class="login_panel">
        <el-form :loading="loading" :model="loginForm" @keyup.enter="handleLogin">
          <div class="right_title">
            <p>管理员登录</p>
          </div>
          <el-form-item prop="mobile">
            <el-input v-model="loginForm.mobile" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item prop="mobilePwd">
            <el-input v-model="loginForm.mobilePwd" type="password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="verCode">
            <el-input v-model="loginForm.verCode" class="var-input" placeholder="请输入验证码"></el-input>
            <img class="var_img" :src="verImg" alt="验证码" @click="getCaptcha" />
          </el-form-item>
          <div>
            <el-button type="primary" color="#2873f0" class="login-button" @click="handleLogin">登录</el-button>
          </div>
        </el-form>
      </div>
    </div>
    <!--    版权-->
    <div class="footer"></div>
  </div>
</template>

<script setup>
  import { ElMessage } from 'element-plus'
  import { encrypt } from '@/utils/base.js'
  import { loginApi } from '@/api/login.js'
  import { onMounted, reactive, ref } from 'vue'
  import { setToken } from '@/utils/cookie.js'
  import router from '@/router/index.js'
  import { PATH } from '@/utils/constants/system'
  import { createNewRouter } from '@/router'
  import { useUserStore } from '@/stores/modules/user.js'

  const verImg = ref()
  const loginForm = reactive({
    mobile: '',
    mobilePwd: '',
    verCode: '',
    verToken: ''
  })
  const getWebsite = ref()
  const loading = ref(false)
  onMounted(() => {
    loginApi.getWebsite().then((res) => {
      getWebsite.value = res
    })
    getCaptcha()
  })
  // 验证码
  const getCaptcha = async () => {
    try {
      const res = await loginApi.getCodeImg()
      verImg.value = res.img
      loginForm.verToken = res.verToken
    } catch (error) {
      ElMessage.error(error.msg)
    }
  }
  const handleLogin = async () => {
    loading.value = true
    try {
      if (!loginForm.mobile) {
        ElMessage.error('请输入用户名')
        return
      }
      if (!loginForm.mobilePwd) {
        ElMessage.error('请输入密码')
        return
      }
      if (!loginForm.verCode) {
        ElMessage.error('请输入验证码')
        return
      }
      const res = await loginApi.getLogin({
        mobile: loginForm.mobile,
        // 加密
        mobilePwdEncrypt: encrypt(loginForm.mobilePwd, getWebsite.value.rsaLoginPublicKey),
        verCode: loginForm.verCode,
        verToken: loginForm.verToken
      })
      useUserStore().login(res)
      createNewRouter(res.routerList)
      delete loginForm.mobilePwd
      setToken(res.token)
      await router.push(PATH.URL_DASHBOARD)
      loading.value = false
    } catch (error) {
      ElMessage.error(error.msg)
      await getCaptcha()
    } finally {
      loading.value = false
    }
  }
</script>

<style lang="scss" scoped>
  .bg {
    height: 100vh;
    background-color: #2873f0;

    .login-content {
      position: absolute;
      top: 50%;
      left: 50%;
      display: flex;
      width: 800px;
      margin: 0 auto;
      transform: translate(-50%) translateY(-50%);

      .login_info {
        padding: 25px;
        width: 350px;
        height: 450px;
        background-color: #033c94;
        border-radius: 12px 0 0 12px;
        color: #fff;
        .title {
          font-size: 20px;
          font-weight: 700;
        }
        .info {
          font-size: 15px;
          font-weight: 300;
          line-height: 25px;
        }
      }
      .login_panel {
        padding: 25px;
        width: 350px;
        height: 450px;
        background-color: #fff;
        border-radius: 0 12px 12px 0;
        .right_title {
          text-align: center;
          font-weight: 700;
          font-size: 20px;
        }
        .var-input {
          width: 200px;
        }
        .var_img {
          margin-left: 20px;
          width: 80px;
          height: auto;
        }
        .login-button {
          width: 350px;
          height: 45px;
        }
      }
    }
  }
</style>
