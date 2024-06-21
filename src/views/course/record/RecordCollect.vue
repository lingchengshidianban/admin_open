<template>
  <!--收藏-->
  <el-form :model="query" inline label-width="80px">
    <el-form-item>
      <el-input v-model="query.mobile" placeholder="根据手机号搜索" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleQuery">查询</el-button>
      <el-button @click="resetQuery">重置</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="page.list">
    <el-table-column label="手机号" prop="mobile"></el-table-column>
    <el-table-column label="用户昵称" prop="nickname"></el-table-column>
    <el-table-column label="收藏时间" prop="gmtCreate"></el-table-column>
    <el-table-column label="操作" width="100">
      <el-button type="danger" @click="handleDelete">删除</el-button>
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
      page: courseApi.courseCollectPage,
      delete: courseApi.courseCollectDelete
    },
    {
      courseId: route.query.courseId
    }
  )
</script>

<style scoped lang="scss"></style>
