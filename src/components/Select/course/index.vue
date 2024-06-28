<template>
  <el-dialog :title="props.title" :model-value="props.visible" :destroy-on-close="true" align-center center :append-to-body="true" @close="onClose">
    <el-form :model="query" inline>
      <el-form-item label="课程名称">
        <el-input v-model="query.courseName" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery">搜索</el-button>
        <el-button @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="page.list">
      <el-table-column prop="courseName" label="课程信息">
        <template #default="scope"></template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script setup>
  import useTable from '@/utils/table.js'
  import { courseApi } from '@/api/course.js'

  const props = defineProps({
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '请选择课程'
    }
  })

  const { query, page, handleQuery, resetQuery } = useTable({
    page: courseApi.coursePage
  })
</script>

<style scoped lang="scss"></style>
