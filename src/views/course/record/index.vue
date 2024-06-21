<template>
  <!--  课程数据-->
  <div class="container">
    <img :src="courseViewRef.courseLogo" :alt="courseViewRef.courseLogo" />
    <div style="padding-left: 20px">
      <div class="course-name">{{ courseViewRef.courseName }}</div>
      <div class="course-info">讲师: {{ courseViewRef.lecturerName }}</div>
      <div class="course-info">售价：{{ courseViewRef.rulingPrice }}</div>
      <div class="course-info">上架状态：{{ courseViewRef.isPutaway === 1 ? '已上架' : '未上架' }}</div>
    </div>
  </div>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="学习记录" name="study">
        <RecordStudy />
      </el-tab-pane>
      <el-tab-pane label="售卖记录" name="order">
        <RecordOrder />
      </el-tab-pane>
      <el-tab-pane label="评论记录" name="comment">
        <RecordComment />
      </el-tab-pane>
      <el-tab-pane label="收藏记录" name="collect">
        <RecordCollect />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { courseApi } from '@/api/course.js'
  import RecordCollect from './RecordCollect.vue'
  import RecordOrder from './RecordOrder.vue'
  import RecordComment from './RecordComment.vue'
  import RecordStudy from './RecordStudy.vue'

  const route = useRoute()
  onMounted(() => {
    handleCourseInfo()
  })

  const activeName = ref('study')

  const courseViewRef = ref({})
  const handleCourseInfo = async () => {
    await courseApi.courseView({ id: route.query.courseId }).then((res) => {
      courseViewRef.value = res
    })
  }
  function handleClick(tab) {
    activeName.value = tab.name
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
</style>
