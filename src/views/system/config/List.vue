<template>
  <el-table :data="props.list">
    <el-table-column label="配置名称" prop="configName" :min-width="30">
      <template #default="scope">
        <span>{{ scope.row.configName }}&nbsp;</span>
        <el-tooltip :content="scope.row.configKey" placement="right-start" effect="light">
          <el-button text>
            <el-icon><InfoFilled /></el-icon>
          </el-button>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column label="参数">
      <template #default="scope">
        <span v-if="(scope.row.contentType === 1 || scope.row.contentType === 2) && scope.row.configShow">{{ scope.row.configValue }}</span>
        <el-button v-if="(scope.row.contentType === 2 || scope.row.contentType === 1) && !scope.row.configShow" link type="primary" @click="handleView(scope.row)">【查看详情】</el-button>
        <img v-if="scope.row.contentType === 3" :src="scope.row.configValue" alt="" style="width: auto; height: 50px" />
        <span v-if="scope.row.contentType === 4">{{ scope.row.configValue == 1 ? '开启' : '关闭' }}</span>
        <EnumView v-if="scope.row.configKey === 'vodPlatform'" :enum-value="scope.row.configValue" :enum-name="'VodPlatformEnum'" />
        <enum-view v-if="scope.row.configKey === 'livePlatform'" :enum-value="scope.row.configValue" :enum-name="'LivePlatformEnum'" />
        <enum-view v-if="scope.row.configKey === 'storagePlatform'" :enum-value="scope.row.configValue" :enum-name="'StoragePlatformEnum'" />
        <enum-view v-if="scope.row.configKey === 'smsPlatform'" :enum-name="'SmsPlatformEnum'" :enum-value="scope.row.configValue" />
        <div style="color: #999">{{ scope.row.remark }}</div>
      </template>
    </el-table-column>
    <el-table-column v-permission="'sys:config:edit'" label="操作" width="220">
      <template #default="scope">
        <el-switch
          v-if="scope.row.contentType === 4"
          v-model="scope.row.configValue"
          active-color="#13ce66"
          active-text="开启"
          active-value="1"
          inactive-color="#ff4949"
          inactive-text="关闭"
          inactive-value="0"
          @change="handleSwitch(scope.row)"
        />
        <el-button v-else type="primary" text @click="handleEditor(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div v-if="props.configType === 3">
    <el-row class="vod-info">
      <el-col :span="6">视频点播回调地址</el-col>
      <el-col v-if="videoUrl" :span="14">{{ videoUrl }}</el-col>
      <el-col :span="4">
        <el-button type="primary" text @click="handleVideo">视频初始化</el-button>
      </el-col>
    </el-row>
  </div>
  <ConfigForm ref="formRef" @refresh="handleList" />
  <ListForm ref="viewForm" />
</template>

<script setup>
  import ListForm from './ListForm.vue'
  import EnumView from '@/components/Enum/View/index.vue'
  import ConfigForm from './ConfigForm.vue'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import { ref, onMounted } from 'vue'
  import { SystemApi } from '@/api/system.js'
  const props = defineProps({
    configType: {
      type: Number,
      default: 1
    },
    list: {
      type: Array,
      default: null
    }
  })
  onMounted(() => {
    if (props.configType === 3) {
      handleConfig()
    }
  })
  const videoUrl = ref('')
  function handleConfig() {
    SystemApi.getVideoUrl().then((res) => {
      videoUrl.value = res
    })
  }

  // 视频初始化
  const videoInitRef = ref()
  function handleVideo() {
    ElMessageBox.confirm('确定初始化视频云配置吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      SystemApi.getVideoInit().then((res) => {
        videoInitRef.value = res
        ElMessage.success('操作成功')
      })
    })
  }

  // 查看详情
  const viewForm = ref()
  const handleView = (row) => {
    viewForm.value.onOpen(row)
  }

  // 编辑
  const formRef = ref()
  function handleEditor(row) {
    formRef.value.onOpen(row)
  }
  const emit = defineEmits(['refresh'])
  const handleList = () => {
    emit('refresh')
  }

  const handleSwitch = (row) => {
    const formModel = {
      id: row.id,
      configShow: row.configShow,
      configValue: row.configValue
    }
    SystemApi.sysConfigEdit(formModel)
  }
</script>

<style scoped lang="scss">
  .vod-info {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
    font-size: 14px;
    color: #606266;
    line-height: 2;
  }
</style>
