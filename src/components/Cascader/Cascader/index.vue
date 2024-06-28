<template>
  <div class="table-catalog">
    <div class="table-catalog-title">
      <span style="float: left">资源目录</span>
      <el-button text link style="float: right" @click="openFormCatalog(null, null)">
        <el-icon><CirclePlus /></el-icon>
      </el-button>
    </div>
    <el-tree
      ref="treeRef"
      style="clear: both"
      :data="treeData"
      :props="{ value: 'id', label: 'categoryName', children: 'childrenList' }"
      :current-node-key="currentNodeKey"
      highlight-current
      node-key="id"
      draggable
      @node-drop="handleDrop"
      @node-click="handleChangeCategory"
    >
      <template #default="{ data }">
        <div style="display: flex; gap: 10px">
          <img src="@/assets/images/folder.svg" alt="" />
          <span>{{ data.categoryName }}</span>
        </div>
        <span class="table-catalog-dropdown">
          <el-dropdown style="margin-top: 3px">
            <el-icon><More /></el-icon>
            <template #dropdown>
              <span>
                <el-dropdown-item @click="openFormCatalog(data, data.id)">添加文件夹</el-dropdown-item>
              </span>
              <span>
                <el-dropdown-item @click="openFormCatalog(data, null)">重命名</el-dropdown-item>
              </span>
              <span>
                <el-dropdown-item @click="deleteCatalog(data)">删除</el-dropdown-item>
              </span>
            </template>
          </el-dropdown>
        </span>
      </template>
    </el-tree>
  </div>
  <CategoryForm ref="catalogRef" @refresh="handleCatalog" />
</template>

<script setup>
  import { ElMessage } from 'element-plus'
  import { courseApi } from '@/api/course.js'
  import { onMounted, ref } from 'vue'
  import CategoryForm from './CategoryForm.vue'
  import { CirclePlus, More } from '@element-plus/icons-vue'

  const props = defineProps({
    categoryType: {
      type: Number,
      default: 0
    },
    categoryId: {
      type: String,
      default: ''
    }
  })
  const emit = defineEmits(['update:category-Id', 'refresh'])
  onMounted(() => {
    handleCatalog()
  })
  // 添加 / 修改文件
  const catalogRef = ref()
  const openFormCatalog = (item, parentId) => {
    catalogRef.value.onOpen(item, parentId)
  }

  // 删除目录
  const deleteCatalog = (item) => {
    courseApi.categoryDelete(item).then((res) => {
      ElMessage.success(res)
      handleCatalog()
    })
  }

  const currentNodeKey = ref('')

  // 拖拽完成后触发
  const handleDrop = () => {}
  // 改变目录
  const handleChangeCategory = (item) => {
    currentNodeKey.value = item.id
    // 触发事件
    emit('update:category-Id', item.id)
    // 刷新
    emit('refresh')
  }

  const treeData = ref()
  const firstTree = ref()
  const handleCatalog = () => {
    courseApi.categoryList({ categoryType: props.categoryType }).then((res) => {
      treeData.value = res
      firstTree.value = res[0]
    })
  }
</script>

<style scoped lang="scss">
  .table-catalog {
    display: block;
    min-height: calc(100vh - 220px);
    width: 250px;
    margin-bottom: 52px;
    overflow: auto;
    border: 1px solid #ebeef5;

    .table-catalog-title {
      padding: 10px 20px;
    }

    .table-catalog-dropdown {
      position: absolute;
      right: 0;
      background-color: #fff;
      margin: 0 auto;
      padding: 0 10px;
    }
  }
</style>
