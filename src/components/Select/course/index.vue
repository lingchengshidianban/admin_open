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
      <el-table-column prop="courseName" label="课程信息" :min-width="200">
        <template #default="scope">
          <div style="display: flex; gap: 10px">
            <el-image :src="scope.row.courseLogo" style="width: 120px; height: 60px; border-radius: 6px; vertical-align: middle" />
            <div style="display: flex; flex-direction: column; justify-content: space-between">
              <div>{{ scope.row.courseName }}</div>
              <div v-if="scope.row.coursePrice === 0">免费</div>
              <div v-else>
                {{ scope.row.coursePrice }}
                <span style="text-decoration: line-through">{{ scope.row.rulingPrice }}</span>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="售价" prop="isPutaway" :min-width="50">
        <template #default="scope">
          <enum-view :enum-name="'PutawayEnum'" :enum-value="scope.row.isPutaway" />
        </template>
      </el-table-column>
      <el-table-column label="操作" :min-width="50">
        <template #default="scope">
          <el-button type="primary" link text @click="handleChoose(scope.row)">选择</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
  <Paging v-model:current-page="page.pageCurrent" v-model:page-size="page.pageSize" :total="page.totalCount" @pagination="handlePage" />
</template>

<script setup>
import useTable from '@/utils/table.js'
import { courseApi } from '@/api/course.js'
import EnumView from '@/components/Enum/View/index.vue'
import Paging from '@/components/Paging/index.vue'

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
const emit = defineEmits(['close'])

const onClose = () => {
  emit('close')
}
const handleChoose = (row) => {
  emit('close', row)
}

const { query, page, handleQuery, resetQuery, handlePage } = useTable({
  page: courseApi.coursePage
})
</script>
