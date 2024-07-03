<template>
  <el-form :model="query" label-width="80px" inline>
    <el-form-item>
      <el-input v-model="query.zoneName" placeholder="请输入专区名称" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleQuery()">查询</el-button>
    </el-form-item>
  </el-form>
  <div class="add">
    <el-button v-permission="'zone:manage'" type="primary" @click="openFormModel">添加</el-button>
  </div>
  <el-table v-loading="page.loading" :data="page.list" row-key="id" class="drag-table">
    <el-table-column prop="courseName" label="专区名称" :min-width="100">
      <template #default="scope">
        <div>
          <span>{{ scope.row.zoneName }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="描述" :min-width="100">
      <template #default="scope">
        {{ scope.row.zoneDesc }}
      </template>
    </el-table-column>
    <el-table-column label="状态" :min-width="50">
      <template #default="scope">
        <enum-view :enum-name="'StatusIdEnum'" :enum-value="scope.row.statusId" />
      </template>
    </el-table-column>
    <el-table-column label="操作" :min-width="50">
      <template #default="scope">
        <el-button text type="primary" @click="handleCourse(scope.row)">课程</el-button>
        <el-divider direction="vertical" />
        <el-dropdown>
          <el-button type="text">
            更多操作
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <el-button type="primary" text @click="openFormModel(scope.row)">编辑</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button type="danger" text @click="handleDelete(scope.row)">删除</el-button>
              </el-dropdown-item>
              <el-dropdown-item @click="handleStatus(scope.row)">
                <el-button v-if="scope.row.statusId === 1" type="primary" text>禁用</el-button>
                <el-button v-if="scope.row.statusId === 0" type="primary" text>启用</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
  <zoneForm ref="formRef" @refresh="handlePage" />
</template>

<script setup>
import { courseApi } from '@/api/course.js'
import useTable from '@/utils/table.js'
import { ArrowDown } from '@element-plus/icons-vue'
import EnumView from '@/components/Enum/View/index.vue'
import zoneForm from './zoneForm.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const handleCourse = (row) => {
  return router.push({ path: '/common/zone/course', query: { zoneId: row.id } })
}
const formRef = ref()
const openFormModel = (row) => {
  formRef.value.onOpen(row)
}

const { page, query, handleQuery, handleDelete, handlePage, handleStatus } = useTable({
  page: courseApi.zoneList,
  delete: courseApi.getDeleteList,
  sort: courseApi.zoneSort,
  status: courseApi.zoneEdit
})
</script>

<style scoped lang="scss"></style>
