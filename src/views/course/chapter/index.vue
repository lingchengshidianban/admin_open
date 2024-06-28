<template>
  <!--章节管理-->
  <div class="container">
    <img :src="courseViewRef.courseLogo" :alt="courseViewRef.courseLogo" />
    <div style="padding-left: 20px">
      <div class="course-name">{{ courseViewRef.courseName }}</div>
      <div class="course-info">讲师: {{ courseViewRef.lecturerName }}</div>
      <div class="course-info">售价：{{ courseViewRef.rulingPrice }}</div>
      <div class="course-info">上架状态：{{ courseViewRef.isPutaway === 1 ? '已上架' : '未上架' }}</div>
    </div>
    <div style="margin-left: auto">
      <el-button type="primary" link text @click="chapterList">编辑</el-button>
    </div>
  </div>
  <div class="tips">章只有一个时，前台不显示章，只显示小节</div>
  <div style="display: flex">
    <chapter :tree-data="treeData" @ratechange="handleChapterList" />
    <div class="main-table">
      <el-table v-loading="loading" :data="periodList">
        <el-table-column align="left">
          <template #header>{{ currentChapterInfo.chapterName }}</template>
          <template #default="scope">
            <!-- 获取当前索引 -->
            <span>{{ scope.$index + 1 }}.</span>
            <span v-if="scope.row.resourceViewResp">
              <el-tag effect="plain">
                <EnumView :enum-name="'ResourceTypeEnum'" :enum-value="scope.row.resourceViewResp.resourceType" />
              </el-tag>
              <span>
                <span class="period-name">{{ scope.row.periodName }}</span>
                ><el-image
                  v-if="scope.row.resourceViewResp.resourceType === 4"
                  style="width: auto; height: 50px; vertical-align: middle; margin-left: 10px"
                  :preview-src-list="[scope.row.resourceViewResp.resourceUrl]"
                  :src="scope.row.resourceViewResp.resourceUrl"
                  preview-teleported
                />
              </span>
              <span v-if="scope.row.resourceViewResp.resourceType < 3">【{{ formatTime(scope.row.resourceViewResp.videoLength) }}】</span>
              <span v-if="scope.row.resourceViewResp.resourceType === 3">【{{ scope.row.resourceViewResp.docPage }}页】</span>
            </span>
            <span v-if="scope.row.liveViewResp">
              <el-tag effect="plain"><EnumView :enum-name="'PeriodTypeEnum'" :enum-value="scope.row.periodType" /></el-tag>
              <span style="padding-right: 20px">{{ scope.row.periodName }}</span>
              <span>主持人：{{ scope.row.liveViewResp.lecturerName }}</span>
              <span> | </span>
              <span>开播时间：{{ scope.row.liveViewResp.beginTime }}</span>
              <span> | </span>
              <span>直播状态：<EnumView :enum-name="'LiveStatusEnum'" :enum-value="scope.row.liveViewResp.liveStatus" /></span>
            </span>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template #header>
            <el-button type="primary" @click="editLiveForm">添加直播</el-button>
            <el-button type="primary" @click="resourceSelect">添加资源</el-button>
          </template>
          <template #default="scope">
            <el-button v-if="scope.row.periodType === 20" type="primary" text link @click="broadcasting(scope.row)">开播</el-button>
            <el-button v-if="scope.row.periodType === 10" type="primary" link text @click="openFormPeriodModal(scope.row)">编辑</el-button>
            <el-divider direction="vertical" />
            <el-button v-if="scope.row.periodType === 20" type="primary" link text @click="editLiveForm(scope.row)">编辑</el-button>
            <el-button type="primary" link text @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <PeriodForm ref="editForm" @refresh="handleChapterList" />
  <LiveForm ref="LiveFormRef" @refresh="handleChapterList" />
  <!--  传入资源-->
  <select-resource v-if="period.visible" :visible="period.visible" @close="handleResource" />
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { courseApi } from '@/api/course.js'
  import Chapter from './Chapter.vue'
  import { formatTime } from '@/utils/base.js'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import PeriodForm from './PeriodForm.vue'
  import EnumView from '@/components/Enum/View/index.vue'
  import LiveForm from './LiveForm.vue'
  import SelectResource from '@/components/Select/Resource/index.vue'

  const route = useRoute()
  const loading = ref(false)
  const treeData = ref({})
  const courseViewRef = ref({})
  onMounted(() => {
    // 课程信息
    chapterList()

    handleChapterList()
  })
  // 课程信息
  async function chapterList() {
    courseViewRef.value = await courseApi.courseView({ id: route.query.courseId })
  }

  const periodList = ref([])
  const currentChapterInfo = ref({})
  async function handleChapterList() {
    await courseApi.chapterList({ courseId: route.query.courseId }).then((res) => {
      treeData.value = res
      if (res && res.length > 0) {
        currentChapterInfo.value = res[0]
        handlePeriodList(res[0].id)
      }
    })
  }
  // 章节列出
  async function handlePeriodList(item) {
    periodList.value = await courseApi.chapterPeriodList({ chapterId: item })
  }

  // 删除
  const handleDelete = (item) => {
    ElMessageBox.confirm('确定要删除吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      courseApi.chapterPeriodDelete({ id: item.id })
      ElMessage.success('删除成功')
      handleChapterList()
    })
  }
  // 课时修改
  const editForm = ref({})
  const openFormPeriodModal = (row) => {
    row.coursePrice = courseViewRef.value.coursePrice
    editForm.value.onOpen(row)
  }

  const broadcasting = (row) => {
    ElMessageBox.confirm('确定要直播吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      courseApi.chapterPeriodBroadcasting({ id: row.id })
      ElMessage.success('开启成功')
      handleChapterList()
    })
  }

  const LiveFormRef = ref()

  const editLiveForm = (row) => {
    row.courseId = courseViewRef.value.id
    row.chapterId = currentChapterInfo.value.id
    row.coursePrice = courseViewRef.value.coursePrice
    LiveFormRef.value.onOpen(row)
  }

  // 添加资源
  const period = ref({
    // 开关对话框
    visible: false,
    // 赋值课程id
    courseId: route.query.courseId,
    chapterId: ''
  })
  const resourceSelect = () => {
    period.value.visible = true
  }
  // 添加资源，接受一个item 回调参数
  const handleResource = (item) => {
    // 关闭弹窗
    period.value.visible = false
    if (item) {
      period.value.periodName = item.resourceName
      period.value.chapterId = currentChapterInfo.value.id
      period.value.resourceId = item.id
      period.value.periodType = 10
      // 调用章节接口
      courseApi.chapterPeriodSave(period.value)
      ElMessage.success('添加成功')
    }
    // 列出 课时
    handlePeriodList(currentChapterInfo.value.id)
  }
</script>

<style scoped lang="scss">
  .container {
    display: flex;
    margin-bottom: 20px;
    img {
      height: 120px;
      border-radius: 10px;
    }
    .course-name {
      font-size: 18px;
      padding-top: 10px;
    }
    .course-info {
      margin-top: 5px;
      line-height: 20px;
      color: #999;
    }
  }
  .tips {
    background: #3d7fff1a;
    color: #666;
    font-size: 14px;
    padding: 10px 15px;
    margin: 20px 0;
    border: 1px solid rgba(61, 127, 255, 0.6);
    border-radius: 5px;
  }
  .main-table {
    width: calc(100% - 250px);
    min-height: 400px;
    .el-tag {
      margin: 0 10px;
    }
  }
</style>
