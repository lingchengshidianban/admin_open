<template>
  <el-dialog :model-value="true" :title="props.title" center align-center width="800px" :append-to-body="true" :destroy-on-close="true" @close="handleClose">
    <el-form :model="query" inline label-width="80px">
      <el-form-item label="讲师名称">
        <el-input v-model="query.lecturerName" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery()">查询</el-button>
        <el-button @click="resetQuery()">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="page.loading" :data="page.list">
      <el-table-column label="讲师信息">
        <template #default="scope">
          <img :src="scope.row.lecturerHead" :alt="scope.row.lecturerName" style="width: 40px; height: 40px; border-radius: 50%; vertical-align: middle" />
          {{ scope.row.lecturerName }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="scope">
          <el-button type="primary" @click="selectLecturer(scope.row)">选择</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
  <Paging v-model:current-page="page.pageCurrent" v-model:page-size="page.pageSize" :total="page.totalCount" @pagination="handlePage" />
</template>

<script setup>
import useTable from '@/utils/table.js'
import { usersApi } from '@/api/users.js'
import Paging from '@/components/Paging/index.vue'

const props = defineProps({
  title: {
    type: String,
    default: '请选择讲师'
  }
})
const emit = defineEmits(['close'])
const selectLecturer = (info) => {
  // 关闭时发送讲师信息
  emit('close', { lecturerName: info.lecturerName, lecturerId: info.id })
}
const handleClose = () => {
  emit('close')
}
const { query, page, handleQuery, resetQuery, handlePage } = useTable({
  page: usersApi.teacherPage
})
</script>

<style scoped lang="scss"></style>
