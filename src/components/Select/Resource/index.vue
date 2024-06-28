<template>
  <el-dialog :model-value="props.visible" :title="props.title" :destroy-on-close="true" :append-to-body="true" center align-center :width="1000" @close="onClose">
    <el-tabs v-if="props.resourceType === 0" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :key="0" label="全部" :name="0" />
      <el-tab-pane v-for="item in tabPanes" :key="item.code" :label="item.desc" :name="item.code"></el-tab-pane>
    </el-tabs>
    <el-form :model="query" inline>
      <el-form-item>
        <el-input v-model="query.resourceName" placeholder="请输入资源名称" clearable />
      </el-form-item>
      <el-form-item><el-button type="primary" @click="handleQuery">查询</el-button><el-button @click="resetQuery">重置</el-button><el-button type="primary">上传</el-button></el-form-item>
    </el-form>
    <div class="table-container">
      <Cascader v-model:category-id="query.categoryId" :category-type="2" @refresh="handlePage" />
      <div v-if="props.resourceType === 4" v-loading="page.loading" class="table-layout">
        <div v-for="item in page.list" :key="item.id" class="table-item" @click="handleCard(item)">
          <el-image :src="item.resourceUrl" class="table_img" lazy />
          <span v-if="item['check']" class="card-check"></span>
          <span class="size_layout">{{ item.imgWidth }}*{{ item.imgHeight }}</span>
          <div class="table-title">
            <div class="title_name">{{ item.resourceName }}</div>
            <div>{{ transformSize(item.resourceSize) }}</div>
          </div>
        </div>
      </div>
      <el-table v-else :data="page.list">
        <el-table-column label="资源名称" prop="resourceName" :min-width="100">
          <template #default="scope">
            <span>{{ scope.$index + 1 }}.</span>
            <span>{{ scope.row.resourceName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="资源类型" prop="resourceType" :width="200">
          <template #default="scope">
            <span>
              <EnumView :enum-value="scope.row.resourceType" :enum-name="'ResourceTypeEnum'" />
              <span v-if="scope.row.resourceType > 1"> 【<EnumView :enum-value="scope.row.storagePlatform" :enum-name="'StoragePlatformEnum'" />】 </span>
              <span v-if="scope.row.resourceType < 3"> 【<EnumView :enum-value="scope.row.vodPlatform" :enum-name="'VodPlatformEnum'" />】 </span>
              <br />
              <span>
                <el-image
                  v-if="scope.row.resourceType === 4"
                  style="width: auto; height: 50px; vertical-align: middle"
                  :src="scope.row.resourceUrl"
                  :preview-src-list="[scope.row.resourceUrl]"
                  preview-teleported
                ></el-image>
              </span>
              <span v-if="scope.row.resourceType === 1">{{ formatTime(scope.row.videoLength) }}</span>
              <span v-if="scope.row.resourceType === 3" style="margin-right: 10px">{{ scope.row.docPage }}页</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" :width="100">
          <template #default="scope">
            <el-button type="primary" text link @click="handleSelect(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <template #footer>
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import useTable from '@/utils/table.js'
  import { getEnumList, formatTime, transformSize } from '@/utils/base.js'
  import { courseApi } from '@/api/course.js'
  import Cascader from '@/components/Cascader/Cascader/index.vue'
  import EnumView from '@/components/Enum/View/index.vue'

  const props = defineProps({
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '选择资源'
    },
    // 资源类型
    resourceType: {
      type: Number,
      default: 0
    },
    // 多选模式
    multiple: {
      type: Boolean,
      default: false
    }
  })
  const emit = defineEmits(['close'])

  const activeName = ref(props.resourceType)
  const tabPanes = ref()
  onMounted(async () => {
    tabPanes.value = await getEnumList('ResourceTypeEnum')
  })

  // 卡片

  const itemList = ref([])
  const handleCard = (item) => {
    // 判断是否选中，如果选中，则取消选中
    item.check = !item.check
    // 获取item的id
    const ids = itemList.value.map((item) => item.id)
    if (item.check) {
      if (ids.indexOf(item.id) === -1) {
        if (props.multiple) {
          itemList.value.push(item)
        } else {
          itemList.value.forEach((i) => {
            i.check = false
          })
          itemList.value = [item]
        }
      } else {
        if (ids.indexOf(item.id) > 1) {
          itemList.value.splice(ids.indexOf(item.id), 1)
        }
      }
    }
  }

  // 关闭
  const onClose = () => {
    emit('close')
  }
  // 选择
  function handleSelect(item) {
    emit('close', item)
  }
  // 确定
  const handleSubmit = () => {
    emit('close', itemList.value)
  }

  // 导航切换
  const handleClick = (tab, event) => {
    console.log(tab, event)
  }
  const { page, query, handleQuery, resetQuery, handlePage } = useTable(
    {
      page: courseApi.resourcePage
    },
    {
      resourceType: props.resourceType
    }
  )
</script>

<style scoped lang="scss">
  .table-container {
    display: flex;
    overflow: auto;
    max-height: calc(50vh);
    .table-layout {
      width: calc(100% - 200px);
      max-height: calc(100vh - 300px);
      display: flex;
      justify-content: center;
      gap: 10px;
      flex-wrap: wrap;
      .table-item {
        position: relative;
        width: 200px;
        height: 180px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 12px;
        cursor: pointer;
        overflow: hidden;

        .table_img {
          width: 100%;
          height: 120px;
          object-fit: cover;
          border-radius: 12px 12px 0 0;
        }
        .size_layout {
          z-index: 10;
          position: absolute;
          top: 3px;
          left: 3px;
          color: black;
        }
        .table-title {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 5px;
          .title_name {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .card-check {
          width: 60px;
          height: 60px;
          top: -30px;
          right: -30px;
          position: absolute;
          background-color: #2873f0;
          transform: rotate(45deg);
          &:before {
            content: '';
            background-image: url('../../../assets/images/check.svg');
            background-repeat: no-repeat;
            width: 14px;
            height: 14px;
            color: #fff;
            position: absolute;
            left: 24px;
            bottom: 5px;
            font-weight: 700;
            transform: rotate(315deg);
          }
        }
      }
    }
  }
</style>
