<template>
  <div class="table-catalog">
    <div class="table-catalog-title">
      <span>章节目录</span
      ><el-button type="text" style="padding-left: 120px">
        <el-icon><CirclePlus /></el-icon>
      </el-button>
    </div>
  </div>
  <el-tree
    ref="treeRef"
    :data="props.treeData"
    highlight-current
    :expand-on-click-node="false"
    :props="{ children: 'childrenList', label: 'chapterName', value: 'id' }"
    node-key="id"
    draggable
    @node-click="handleClick"
    @node-drop="handleDrop"
  >
    <template #default="{ data }">
      <span>{{ data.chapterName }}</span>
    </template>
  </el-tree>
</template>

<script setup>
  import { ref, onMounted, computed } from 'vue'
  import { courseApi } from '@/api/course.js'
  import { ElMessage } from 'element-plus'

  // 接收父组件传过来的数据
  const props = defineProps({
    chapterId: {
      type: String,
      default: ''
    },
    treeData: {
      type: Object,
      default: null
    }
  })
  const chapterId = computed(() => {
    return props.chapterId
  })
  const treeRef = ref()
  const emit = defineEmits(['node-click', 'refresh'])

  onMounted(() => {
    treeRef['value'].setCurrentKey(chapterId.value)
  })

  const handleClick = (node) => {
    emit('node-click', node)
  }

  function handleDrop() {
    const sortList = getTreeSort(props.treeData, 1)
    courseApi.chapterSort(sortList).then((res) => {
      ElMessage.success(res)
    })
  }

  const getTreeSort = (list, sort) => {
    return list.map((el, index) => {
      if (el['childrenList'] && el['childrenList'].length > 0) {
        el.children = getTreeSort(el['childrenList'], sort)
      }
      el.sort = sort + index
      return {
        id: el.id,
        sort: el.sort,
        childrenList: el.children
      }
    })
  }
</script>

<style scoped lang="scss">
  .table-catalog {
    display: block;
    min-height: calc(100vh - 220px);
    width: 250px;
    border: 1px solid #ebeef5;
    overflow: auto;
    .table-catalog-title {
      cursor: pointer;
      padding: 10px 20px;
    }
  }
</style>
