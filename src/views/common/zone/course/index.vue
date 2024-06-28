<template>
  <el-form :model="query" label-width="80px" inline>
    <el-form-item label="课程名称">
      <el-input v-model="query.courseName" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleQuery">查询</el-button>
      <el-button @click="resetQuery">重置</el-button>
      <el-button @click="openFormModel">添加课程</el-button>
    </el-form-item>
  </el-form>
  <el-table v-loading="page.loading" :data="page.list" row-key="id" class="drag-table">
    <el-table-column label="课程信息" :min-width="200">
      <template #default="scope">
        <div style="display: flex; gap: 10px">
          <el-image :src="scope.row.courseViewResp.courseLogo" style="width: 120px; height: 50px; vertical-align: middle; border-radius: 5px" />
          <div>
            <span>{{ scope.row.courseViewResp.courseName }}</span>
            <br />
            <span v-if="scope.row.courseViewResp.coursePrice === 0">免费</span>
            <span v-else
              >￥{{ scope.row.courseViewResp.coursePrice }}<span style="text-decoration: line-through">{{ scope.row.courseViewResp.rulingPrice }}</span></span
            >
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="售卖" prop="isPutaway" :min-width="50">
      <template #default="scope">
        <enum-view :enum-name="'PutawayEnum'" :enum-value="scope.row.courseViewResp.isPutaway" />
      </template>
    </el-table-column>
    <el-table-column label="课程状态" prop="statusId" :min-width="50">
      <template #default="scope">
        <enum-view :enum-name="'StatusIdEnum'" :enum-value="scope.row.courseViewResp.statusId" />
      </template>
    </el-table-column>
    <el-table-column label="操作" :min-width="70">
      <template #default="scope">
        <el-button v-if="scope.row.statusId === 1" type="primary" text link @click="handleStatus(scope.row)">禁用</el-button>
        <el-button v-if="scope.row.statusId === 0" type="primary" text link @click="handleStatus(scope.row)">启用</el-button>
        <el-button type="primary" text link @click="handleDelete(scope.row, '确定移除该课程吗？')">移除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <select-course />
</template>

<script setup>
  import useTable from '@/utils/table.js'
  import { courseApi } from '@/api/course.js'
  import { useRoute } from 'vue-router'
  import EnumView from '@/components/Enum/View/index.vue'
  import SelectCourse from '@/components/Select/course/index.vue'
  import { ref } from 'vue'
  const route = useRoute()

  const openFormModel = () => {}

  const { query, page, handleDelete, handleStatus, handleQuery, resetQuery } = useTable(
    {
      page: courseApi.courseZoneList,
      delete: courseApi.courseZoneDelete,
      status: courseApi.courseZoneEdit,
      sort: courseApi.courseZoneSort
    },
    {
      zoneId: route.query.zoneId
    }
  )
</script>
