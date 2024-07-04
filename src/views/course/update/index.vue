<template>
  <!--添加-->
  <el-form ref="formRef" :model="formModel" :rules="rules" :label-width="150" style="max-width: 980px" @submit.prevent>
    <div>基础信息</div>
    <el-form-item label="分类" prop="categoryId">
      <CascaderCourse v-model="formModel.categoryId" />
    </el-form-item>
    <el-form-item label="名称" prop="courseName">
      <el-input v-model="formModel.courseName" maxlength="125" placeholder="请输入课程名称" show-word-limit />
    </el-form-item>
    <el-form-item label="讲师" prop="lecturerId">
      <div style="display: flex; gap: 15px">
        <el-input v-model="formModel.lecturerName" placeholder="请输入讲师名称" disabled />
        <el-button type="primary" @click="lecturerSelect">选择讲师</el-button>
      </div>
    </el-form-item>
    <el-form-item label="课程封面" prop="courseLogo">
      <SelectorImage v-model="formModel.courseLogo" :width="'270px'" :height="'150px'" sug-img="'尺寸：900x500px,格式:JPG、PNG，大小：<2M'" />
    </el-form-item>
    <el-form-item label="简介">
      <Editor v-model="formModel.introduce" />
    </el-form-item>
    <div style="margin-left: 80px; font-size: 14px">
      <div>课程设置</div>
      <el-form-item label="倍速播放" prop="speedDouble">
        <EnumRadio v-model="formModel.speedDouble" :mode-name="'SpeedDoubleEnum'" />
        <span style="color: #999; padding-left: 30px">开启后，用户可在播放页面选择播放速度，默认为1倍速播放。</span>
      </el-form-item>
      <el-form-item label="拖拽播放" prop="speedDrag">
        <EnumRadio v-model="formModel.speedDrag" :mode-name="'SpeedDragEnum'" />
        <span style="color: #999; padding-left: 30px">开启后，用户可在播放页面快速拖拽播放，关闭则无法进行拖拽播放。</span>
      </el-form-item>
      <el-form-item label="销售价" prop="coursePrice">
        <el-input-number v-model="formModel.coursePrice" :min="0" :precision="2" />
      </el-form-item>
      <el-form-item label="划线价" prop="rulingPrice">
        <el-input-number v-model="formModel.rulingPrice" :min="0" :precision="2" />
      </el-form-item>
      <el-form-item label="售卖状态">
        <EnumRadio v-model="formModel.isPutaway" :mode-name="'PutawayEnum'" />
      </el-form-item>
    </div>
    <el-form-item>
      <el-button @click="handleClose">关闭</el-button>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
  <select-lecturer v-if="visible" @close="handleLecturer" />
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import CascaderCourse from '@/components/Cascader/Course/index.vue'
import SelectLecturer from '@/components/Select/Lecturer/index.vue'
import SelectorImage from '@/components/Selector/Image/index.vue'
import EnumRadio from '@/components/Enum/Radio/index.vue'
import Editor from '@/components/Editor/index.vue'
import { courseApi } from '@/api/course.js'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()

const visible = ref(false)
const loading = ref(false)
const emit = defineEmits(['refresh'])

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
  speedDouble: 1, //倍速
  speedDrag: 1 //拖拽
}
const formRef = ref()
const rules = reactive({
  categoryId: [{ required: true, message: '请选择分类', trigger: 'blur' }],
  courseName: [{ required: true, message: '请输入课程名称', trigger: 'blur' }],
  lecturerId: [{ required: true, message: '请选择讲师', trigger: 'blur' }],
  courseLogo: [{ required: true, message: '请上传课程封面', trigger: 'blur' }]
})
const onSubmit = async () => {
  const res = await formRef.value.validate()
  if (!res) return
  if (loading.value === true) return ElMessage.success('请稍后...')
  loading.value = true
  try {
    if (formModel.id) {
      await courseApi.courseEdit(formModel)
      ElMessage.success('修改成功')
    } else {
      await courseApi.courseSave(formModel)
      ElMessage.success('添加成功')
    }
    emit('refresh')
    router.go(-1)
  } finally {
    loading.value = false
  }
}

const formModel = reactive({ ...formDefault })
onMounted(async () => {
  if (route.query.courseId) {
    const res = await courseApi.courseView({ id: route.query.courseId })
    Object.assign(formModel, res)
  }
})
const handleClose = () => {
  router.go(-1)
}
</script>

<style scoped lang="scss"></style>
