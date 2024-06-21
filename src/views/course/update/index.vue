<template>
  <!--添加-->
  <el-form ref="formRef" :model="formModel" :rules="rules" :label-width="80" style="max-width: 980px" @submit.prevent>
    <div>基础信息</div>
    <el-form-item label="分类" prop="categoryId">
      <CascaderCourse v-model="formModel.categoryId" />
    </el-form-item>
    <el-form-item label="名称" prop="courseName">
      <el-input v-model="formModel.courseName" maxlength="125" placeholder="请输入课程名称" show-word-limit />
    </el-form-item>
    <el-form-item label="讲师" prop="lecturerId">
      <div style="display: flex">
        <el-input v-model="formModel.lecturerName" placeholder="请输入讲师名称" disabled />
        <el-button type="primary" @click="lecturerSelect">选择讲师</el-button>
      </div>
    </el-form-item>
    <el-form-item label="课程封面" prop="courseLogo">
      <SelectorImage v-model="formModel.courseLogo" :width="'270px'" :height="'150px'" sug-img="'尺寸：900x500px,格式:JPG、PNG，大小：<2M'" />
    </el-form-item>
  </el-form>
  <select-lecturer v-model="visible" @close="handleLecturer" />
</template>

<script setup>
  import { reactive, ref } from 'vue'
  import CascaderCourse from '@/components/Cascader/Course/index.vue'
  import SelectLecturer from '@/components/Select/Lecturer/index.vue'
  import SelectorImage from '@/components/Selector/Image/index.vue'

  const visible = ref(false)
  const loading = ref(false)

  const lecturerSelect = () => {
    visible.value = true
  }
  const handleLecturer = (item) => {
    visible.value = false
    if (item) {
      formModel.lecturerName = item.lecturerName
      formModel.lecturerId = item.lecturerId
    }
  }

  const formDefault = {
    id: undefined,
    categoryId: undefined,
    courseName: undefined,
    lecturerId: undefined,
    lecturerName: undefined,
    courseLogo: undefined,
    introduce: undefined,
    coursePrice: 0,
    rulingPrice: 0,
    isPutaway: 0,
    speedDouble: 1,
    speedDrag: 1
  }
  const formRef = ref()
  const rules = reactive({
    categoryId: [{ required: true, message: '请选择分类', trigger: 'blur' }],
    courseName: [{ required: true, message: '请输入课程名称', trigger: 'blur' }],
    lecturerId: [{ required: true, message: '请选择讲师', trigger: 'blur' }],
    courseLogo: [{ required: true, message: '请上传课程封面', trigger: 'blur' }]
  })
  const formModel = reactive({ ...formDefault })
</script>

<style scoped lang="scss"></style>
