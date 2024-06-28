<template>
  <el-dialog v-model="visible" center align-center :width="1000" :append-to-body="true" :title="formModel.id ? '添加' : '修改'" :destroy-on-close="true" @close="onClose">
    <el-form ref="formRef" :model="formModel" :rules="rules" label-width="80px" @submit.prevent>
      <el-form-item label="主讲人" prop="lecturerId">
        <el-input v-model="formModel.lecturerName" disabled placeholder="请选择主讲人" style="width: 250px; margin-right: 20px" />
        <el-button type="primary" @click="lecturerSelect">选择</el-button>
      </el-form-item>
      <el-form-item label="课时名称" prop="periodName">
        <el-input v-model="formModel.periodName" placeholder="请输入课时名称" :maxlength="100" show-word-limit />
      </el-form-item>
      <el-form-item label="直播时间" prop="beginTime">
        <span class="mar_sty">开播时间</span>
        <el-date-picker
          v-model="formModel.beginTime"
          value-format="YYY-MM-DD HH:mm:ss"
          format="YYYY-MM-DD HH:mm:ss"
          type="datetime"
          placeholder="选择日期时间"
          style="width: 250px; margin-right: 20px"
        />
        <span class="mar_sty">预计时长(单位：分钟)</span>
        <el-input-number v-model="formModel.liveDuration" :min="0" :max="1000" />
      </el-form-item>
      <el-form-item v-if="coursePrice" label="收费设置" prop="isFree">
        <enum-radio v-model="formModel.isFree" :mode-name="'FreeEnum'" />
      </el-form-item>
      <el-form-item label="直播延迟" prop="liveDelay">
        <enum-radio v-model="formModel.liveDelay" :mode-name="'LiveDelayEnum'" />
      </el-form-item>
      <el-form-item label="直播简介" prop="liveIntroduce">
        <Editor v-model="formModel.liveIntroduce" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary" @click="onSubmit">确定</el-button>
    </template>
  </el-dialog>
  <select-lecturer v-if="lecturer.visible" v-model="visible" @close="handleLecturer" />
</template>

<script setup>
  import { ref, reactive } from 'vue'
  import { ElMessage } from 'element-plus'
  import SelectLecturer from '@/components/Select/Lecturer/index.vue'
  import EnumRadio from '@/components/Enum/Radio/index.vue'
  import Editor from '@/components/Editor/index.vue'
  import { courseApi } from '@/api/course.js'

  const formRef = ref(null)
  const rules = {
    lecturerId: { required: true, message: '请选择主讲人', trigger: 'change' },
    periodName: { required: true, message: '请输入课时名称', trigger: 'blur' }
  }

  const visible = ref(false)
  const lecturer = reactive({
    visible: false
  })
  const emit = defineEmits(['refresh'])

  const formDefault = {
    id: undefined,
    periodName: undefined,
    beginTime: undefined,
    periodType: 20,
    liveDuration: 60,
    liveDelay: 1,
    liveModel: 1,
    isFree: 0
  }
  const coursePrice = ref(0)
  const formModel = reactive({ ...formDefault })

  const onOpen = (item) => {
    coursePrice.value = item.coursePrice
    formModel.courseId = item.courseId
    formModel.chapterId = item.chapterId
    if (item.id) {
      Object.assign(formModel, item.liveViewResp)
      formModel.id = item.id
      formModel.liveId = item.liveId
      formModel.sort = item.sort
      formModel.isFree = item.isFree
      formModel.periodName = item.periodName
    }
    visible.value = true
  }
  defineExpose({ onOpen })

  const loading = ref(false)
  const onSubmit = async () => {
    const isValid = await formRef.value.validate()
    if (!isValid) return
    if (loading.value === true) return ElMessage.success('正在处理...')
    loading.value = true
    try {
      if (formModel.id) {
        await courseApi.chapterPeriodEdit(formModel)
        ElMessage.success('修改成功')
      } else {
        await courseApi.chapterPeriodSave(formModel)
        ElMessage.success('添加成功')
      }
      emit('refresh')
      onClose()
    } finally {
      loading.value = false
    }
    visible.value = false
  }
  const onClose = () => {
    visible.value = false
    Object.assign(formModel, formDefault)
  }
  function lecturerSelect() {
    lecturer.visible = true
  }
  const handleLecturer = (item) => {
    lecturer.visible = false
    if (item) {
      // 将讲师信息赋值给表单
      formModel.lecturerId = item.lecturerId
      formModel.lecturerName = item.lecturerName
    }
  }
</script>

<style scoped lang="scss">
  .mar_sty {
    margin-right: 5px;
  }
</style>
