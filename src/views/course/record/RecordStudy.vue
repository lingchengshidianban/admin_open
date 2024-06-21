<template>
  <!--学习记录-->
  <div>
    <el-form :model="query" inline label-width="80px">
      <el-form-item>
        <el-input v-model="query.mobile" prefix-icon="search" placeholder="根据手机号进行搜索" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery()">查询</el-button>
        <el-button @click="resetQuery()">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="page.loading" :data="page.list">
      <el-table-column label="手机号" :min-width="50" prop="mobile" />
      <el-table-column label="用户昵称" :min-width="50" prop="nickname" />
      <el-table-column label="学习进度" :min-width="120" prop="courseProgress">
        <template #default="scope">
          <el-progress :percentage="scope.row.courseProgress" />
        </template>
      </el-table-column>
      <el-table-column label="开始学习时间" :min-width="70" prop="gmtCreate"> </el-table-column>
      <el-table-column label="操作" :min-width="50">
        <template #default="scope">
          <el-button text type="primary" @click="openStudyRecord(scope.row)">明细</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <Study ref="formRef" />
</template>

<script setup>
  import useTable from '@/utils/table.js'
  import { courseApi } from '@/api/course.js'
  import Study from './Study.vue'
  import { useRoute } from 'vue-router'
  import { ref } from 'vue'
  const route = useRoute()

  const formRef = ref()
  function openStudyRecord(item) {
    formRef.value.onOpen(item)
  }

  const { page, query, handleQuery, resetQuery } = useTable(
    {
      page: courseApi.userCourseRecord
    },
    {
      courseId: route.query.courseId
    }
  )
</script>

<style scoped lang="scss"></style>
