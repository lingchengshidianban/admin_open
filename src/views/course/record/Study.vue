<template>
  <el-dialog :model-value="visible" :destroy-on-close="true" width="700px" center align-center :append-to-body="true" title="学习明细" @close="onClose">
    <el-table :tree-props="{ children: 'userStudyPeriodPageRespList' }" row-key="id" :data="studyRecordsRef">
      <el-table-column label="章节名称" prop="chapterName">
        <template #default="scope">
          <span>{{ scope.row.chapterName }}</span>
          <span>{{ scope.row.periodName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学习时间" prop="gmtCreate"></el-table-column>
      <el-table-column label="学习进度">
        <template #default="scope">
          <el-progress :percentage="scope.row.progress" />
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script setup>
  import { ref } from 'vue'
  import { courseApi } from '@/api/course.js'

  const visible = ref(false)
  const studyRecordsRef = ref([])

  const onOpen = (item) => {
    if (item) {
      courseApi.resourceRecordPage({ courseId: item.courseId, userId: item.userId }).then((res) => {
        studyRecordsRef.value = res.list
      })
    }
    visible.value = true
  }
  defineExpose({ onOpen })
  const onClose = () => {
    visible.value = false
    Object.assign(studyRecordsRef.value, {})
  }
</script>

<style scoped lang="scss"></style>
