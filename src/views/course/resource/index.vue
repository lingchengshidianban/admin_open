<template>
  <el-tabs v-model="activeName" @tab-click="handleTabClick">
    <el-tab-pane :key="0" label="全部" :name="0" />
    <el-tab-pane v-for="item in tabPanes" :key="item.code" :label="item.desc" :name="item.code" />
  </el-tabs>
  <el-form :model="query" label-width="80px" inline>
    <el-form-item>
      <el-input v-model="query.resourceName" placeholder="请输入资源名称" prefix-icon="search" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleQuery">查询</el-button>
      <el-button @click="resetQuery">重置</el-button>
      <UploadFile v-permission="'resource:save'" :category-id="query.categoryId" :on-bus="onBus" @refresh="handlePage" />
      <el-button v-permission="'resource:edit'" style="margin-left: 10px" :disabled="!ids.length > 0" @click="handleBatchMove()">批量移动</el-button>
      <el-button v-permission="'resource:delete'" style="margin-left: 10px" :disabled="!ids.length > 0" @click="handleBatchDelete()">批量删除</el-button>
    </el-form-item>
  </el-form>
  <div style="display: flex">
    <Cascader v-model:category-id="query.categoryId" :category-type="2" @refresh="handlePage" />
    <el-table v-loading="page.loading" :data="page.list" row-key="id" class="drag-table" @selection-change="handleSelectionChange">
      <el-table-column type="selection" :width="40" />
      <el-table-column label="资源名称" :min-width="120" prop="resourceName">
        <template #default="scope">
          <div style="display: flex">
            <p>{{ scope.row.resourceName }}</p>
            <el-button v-if="scope.row.videoStatus === 2" link @click="onPreview(scope.row)">
              <el-icon size="20">
                <VideoPlay />
              </el-icon>
            </el-button>
          </div>
          <el-image v-if="scope.row.resourceType === 4" preview-teleported style="height: 50px; width: auto" :preview-src-list="[scope.row.resourceUrl]" :src="scope.row.resourceUrl" alt="" />
        </template>
      </el-table-column>
      <el-table-column label="资源类型" props="resourceType" :min-width="50">
        <template #default="scope">
          <enum-view :enum-name="'ResourceTypeEnum'" :enum-value="scope.row.resourceType" />
        </template>
      </el-table-column>
      <el-table-column label="资源大小" :min-width="80">
        <template #default="scope">
          {{ transformSize(scope.row.resourceSize) }}
          <span v-if="scope.row.resourceType < 3">|{{ formatTime(scope.row.videoLength) }}</span>
          <span v-if="scope.row.resourceType === 3">|{{ scope.row.docPage }}页</span>
        </template>
      </el-table-column>
      <el-table-column label="资源状态" prop="videoStatus" :min-width="50">
        <template #default="scope">
          <span v-if="scope.row.resourceType < 3">
            <enum-view :enum-name="'VideoStatusEnum'" :enum-value="scope.row.videoStatus" />
          </span>
          <span v-else>成功</span>
        </template>
      </el-table-column>
      <el-table-column label="平台" :min-width="50">
        <template #default="scope">
          <enum-view v-if="scope.row.resourceType < 3" :enum-name="'VodPlatformEnum'" :enum-value="scope.row.vodPlatform"></enum-view>
          <enum-view v-else :enum-name="'StoragePlatformEnum'" :enum-value="scope.row.storagePlatform"></enum-view>
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="address" :min-width="100">
        <template #default="scope">
          <el-button v-permission="'resource:edit'" text type="primary" @click="openFormModal(scope.row)">编辑</el-button>
          <el-divider direction="vertical" />
          <el-dropdown>
            <el-button type="primary" text>更多操作</el-button>
            <template #dropdown>
              <el-dropdown-item>
                <el-button text type="danger" @click="handleDelete(scope.row)">删除</el-button>
              </el-dropdown-item>
              <el-dropdown-item @click="handleStatus(scope.row)">
                <el-button v-if="scope.row.statusId === 0" text type="primary">启动</el-button>
                <el-button v-if="scope.row.statusId === 1" text type="primary">禁用</el-button>
              </el-dropdown-item>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <ResourceForm ref="formRef" @refresh="handlePage" />
  <MoveDirectory ref="moveRef" @refresh="handlePage" />
  <Preview v-if="resource.visible" :visible="resource.visible" :resource-id="resource.resourceId" :resource-name="resource.resourceName" @close="handleClose" />
</template>

<script setup>
import useTable from '@/utils/table.js'
import { courseApi } from '@/api/course.js'
import { ref, onMounted, reactive } from 'vue'
import { getEnumList } from '@/utils/base.js'
import Cascader from '@/components/Cascader/Cascader/index.vue'
import UploadFile from '@/components/Upload/File/index.vue'
import Preview from '@/components/Preview/index.vue'
import { VideoPlay } from '@element-plus/icons-vue'
import MoveDirectory from './MoveDirectory.vue'
import EnumView from '@/components/Enum/View/index.vue'
import ResourceForm from './ResourceForm.vue'
import { transformSize, formatTime } from '@/utils/base.js'
import { ElMessageBox, ElMessage } from 'element-plus'

const onBus = ref(false)
const tabPanes = ref()
onMounted(async () => {
  onBus.value = true
  tabPanes.value = await getEnumList('ResourceTypeEnum')
})
const { query, page, handleQuery, resetQuery, handlePage, handleDelete, handleStatus } = useTable({
  page: courseApi.resourcePage,
  delete: courseApi.resourceDelete,
  status: courseApi.resourceEdit,
  sort: courseApi.resourceSort
})

const activeName = ref(0)

function handleTabClick(tab) {
  activeName.value = tab.props.name
  query.resourceType = tab.props.name
  handleQuery()
}

const ids = ref([])
const handleSelectionChange = (rows) => {
  ids.value = []
  rows.forEach((row) => {
    ids.value.push(row.id)
  })
}

const resource = reactive({
  resourceName: '',
  visible: false,
  resourceId: ''
})
const onPreview = (row) => {
  resource.resourceId = row.id
  resource.resourceName = row.resourceName
  resource.visible = true
}
const handleClose = () => {
  resource.visible = false
}

// 批量移动
const moveRef = ref()
function handleBatchMove() {
  moveRef.value.onOpen(ids.value)
}
// 批量删除
function handleBatchDelete() {
  ElMessageBox.confirm('确定要删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    courseApi.resourceDelete(ids.value).then((res) => {
      ElMessage.success(res)
      handlePage()
    })
  })
}

const formRef = ref()
const openFormModal = (item) => {
  formRef.value.onOpen(item)
}
</script>

<style scoped lang="scss"></style>
