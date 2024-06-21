<template>
  <!--章节管理-->
  <div class="container">
    <img :src="courseViewRef.courseLogo" :alt="courseViewRef.courseLogo" />
    <div style="padding-left: 20px">
      <div class="course-name">{{ courseViewRef.courseName }}</div>
      <div class="course-info">讲师: {{ courseViewRef.lecturerName }}</div>
      <div class="course-info">售价：{{ courseViewRef.rulingPrice }}</div>
      <div class="course-info">上架状态：{{ courseViewRef.isPutaway === 1 ? '已上架' : '未上架' }}</div>
    </div>
    <div style="margin-left: auto">
      <el-button type="primary" link text @click="chapterList">编辑</el-button>
    </div>
  </div>
  <div class="tips">章只有一个时，前台不显示章，只显示小节</div>
  <div style="display: flex">
    <chapter :tree-data="treeData" @ratechange="handleChapterList" />
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { courseApi } from '@/api/course.js'
  import Chapter from './Chapter.vue'
  const route = useRoute()

  const treeData = ref()
  const courseViewRef = ref({})
  onMounted(() => {
    chapterList()
  })
  async function chapterList() {
    courseViewRef.value = await courseApi.courseView({ id: route.query.courseId })
  }

  async function handleChapterList() {
    await courseApi.chapterList({ courseId: route.query.courseId }).then((res) => {
      treeData.value = res
    })
  }
</script>

<style scoped lang="scss">
  .container {
    display: flex;
    margin-bottom: 20px;
    img {
      height: 120px;
      border-radius: 10px;
    }
    .course-name {
      font-size: 18px;
      padding-top: 10px;
    }
    .course-info {
      margin-top: 5px;
      line-height: 20px;
      color: #999;
    }
  }
  .tips {
    background: #3d7fff1a;
    color: #666;
    font-size: 14px;
    padding: 10px 15px;
    margin: 20px 0;
    border: 1px solid rgba(61, 127, 255, 0.6);
    border-radius: 5px;
  }
</style>
