<template>
  <el-form inline :model="query.data">
    <el-form-item label="用户名">
      <el-input v-model="query.courseName" placeholder="请输入用户名" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleQuery()">查询</el-button>
      <el-button @click="resetQuery()">重置</el-button>
      <el-button type="primary" @click="handleEs">同步ES</el-button>
    </el-form-item>
  </el-form>
  <div style="margin-bottom: 20px">
    <el-button type="primary" @click="toCourseAdd()">添加课程</el-button>
  </div>
  <el-table :data="page.list">
    <el-table-column label="课程信息" :min-width="180">
      <template #default="scope">
        <div style="display: flex; gap: 10px">
          <img :src="scope.row.courseLogo" alt="" style="width: 90px; height: 50px; border-radius: 5px" />
          <div>
            <div>{{ scope.row.courseName }}</div>
            <div>
              {{ scope.row.rulingPrice }}<span style="text-decoration: line-through; margin-left: 10px">{{ scope.row.coursePrice }}</span>
            </div>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="所属分类/讲师" :min-width="50">
      <template #default="scope">
        <div>{{ scope.row.categoryName }}</div>
        <div>{{ scope.row.lecturerName }}</div>
      </template>
    </el-table-column>
    <el-table-column label="销售量/学习人数" :min-width="50">
      <template #default="scope">
        <span
          >{{ scope.row.countBuy }} / <span>{{ scope.row.countStudy }}</span></span
        >
      </template>
    </el-table-column>
    <el-table-column label="售卖" :min-width="50">
      <template #default="scope">
        <EnumView :enum-name="'PutawayEnum'" :enum-value="scope.row.isPutaway" />
      </template>
    </el-table-column>
    <el-table-column label="状态" :min-width="50">
      <template #default="scope">
        <EnumView :enum-name="'StatusIdEnum'" :enum-value="scope.row.statusId" />
      </template>
    </el-table-column>
    <el-table-column label="操作" :min-width="100">
      <template #default="scope">
        <el-button v-permission="'user:course'" text type="primary" @click="handleData(scope.row)">数据</el-button>
        <el-divider direction="vertical" />
        <el-button v-permission="'course:chapter:period'" text type="primary" @click="toCourseChapter(scope.row)">章节</el-button>
        <el-divider direction="vertical" />
        <el-dropdown>
          <el-button type="primary" text>更多操作</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <el-button text type="primary" @click="toCourseUpdate(scope.row)">编辑</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button text type="primary" @click="handleDelete(scope.row)">删除</el-button>
              </el-dropdown-item>
              <el-dropdown-item @click="handleStatus(scope.row)">
                <el-button v-if="scope.row.statusId === 0" text type="primary">启用</el-button>
                <el-button v-if="scope.row.statusId === 1" text type="primary">禁用</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
  import useTable from '@/utils/table.js'
  import { ElMessageBox } from 'element-plus'
  import { courseApi } from '@/api/course.js'
  import { useRouter } from 'vue-router'
  import EnumView from '@/components/Enum/View/index.vue'
  const router = useRouter()

  // 数据管理
  const handleData = (row) => {
    router.push({ path: '/Course/record', query: { courseId: row.id } })
  }
  // 章节管理
  const toCourseChapter = (row) => {
    router.push({ path: '/Course/chapter', query: { courseId: row.id } })
  }

  //添加
  const toCourseAdd = () => {
    router.push({ path: '/Course/update' })
  }
  // 编辑
  const toCourseUpdate = (row) => {
    router.push({ path: '/Course/update', query: { courseId: row.id } })
  }
  const { page, query, handleQuery, resetQuery, handleDelete, handleStatus } = useTable({
    page: courseApi.coursePage,
    delete: courseApi.courseDelete,
    status: courseApi.courseEdit
  })
  const handleEs = () => {
    ElMessageBox.confirm('将课程信息同步到ES,用于吗，门户搜索', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(() => {
      courseApi.courseEs()
    })
  }
</script>

<style scoped lang="scss"></style>
