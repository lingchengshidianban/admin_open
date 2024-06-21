<template>
  <!--评论-->
  <el-form label-width="80px" inline :model="query">
    <el-form-item>
      <el-input v-model="query.commentText" placeholder="请输入评论内容" prefix-icon="search" />
    </el-form-item>
    <el-form-item><el-button type="primary" @click="handleQuery()">查询</el-button><el-button @click="resetQuery">重置</el-button></el-form-item>
  </el-form>
  <el-table v-loading="page.loading" :data="page.list">
    <el-table-column label="用户手机" :min-width="20" prop="mobile" />
    <el-table-column label="用户昵称" prop="nickname" :min-width="20" />
    <el-table-column label="评论内容" prop="commentText" />
    <el-table-column label="操作" :width="100">
      <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
    </el-table-column>
  </el-table>
</template>

<script setup>
  import useTable from '@/utils/table.js'
  import { courseApi } from '@/api/course.js'
  import { useRoute } from 'vue-router'
  const route = useRoute()

  const { query, page, handleQuery, resetQuery, handleDelete } = useTable(
    {
      page: courseApi.courseCommentPage,
      delete: courseApi.courseCommentDelete
    },
    {
      courseId: route.query.courseId
    }
  )
</script>
