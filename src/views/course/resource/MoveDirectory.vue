<template>
  <el-dialog title="移动指定目录" :append-to-body="true" :model-value="visible" width="600px" center align-center :destroy-on-close="true" @close="onclose">
    <el-tree
      ref="treeRef"
      :data="treeData"
      :props="{ value: 'id', label: 'categoryName', children: 'childrenList' }"
      default-expand-all
      node-key="id"
      highlight-current
      :expand-on-click-node="false"
      @node-click="handleNode"
    >
      <template #default="{ data, node }">
        <span>
          <img style="width: 20px; height: 20px; margin-right: 5px" src="@/assets/images/folder.svg" alt="" />
          <span :class="{ active: formModel.categoryId === data.id }">{{ node.label }}</span>
        </span>
      </template>
    </el-tree>
    <template #footer>
      <el-button @click="onclose">取消</el-button>
      <el-button type="primary" @click="onSubmit()">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
  import { ElMessage } from 'element-plus'
  import { ref, reactive, onMounted } from 'vue'
  import { courseApi } from '@/api/course.js'

  function handleNode(data) {
    formModel.categoryId = data.id
  }
  const emit = defineEmits(['refresh'])
  const treeRef = ref()
  const treeData = ref()
  const visible = ref(false)

  const formDefault = {
    ids: [],
    categoryId: undefined
  }
  const formModel = reactive({ ...formDefault })

  onMounted(() => {
    // 获取分类列表
    courseApi.categoryList({ categoryType: 2 }).then((res) => {
      treeData.value = res
    })
  })
  const loading = ref(false)

  const onSubmit = async () => {
    if (loading.value === true) {
      ElMessage.warning('处理中请稍等...')
      return
    }
    loading.value = true
    try {
      await courseApi.resourceDeleteList(formModel)
      ElMessage.success('修改成功')
      emit('refresh')
      onclose()
    } finally {
      loading.value = false
    }
  }
  const onOpen = (item) => {
    if (item) {
      formModel.categoryId = item.id
    }
    visible.value = true
  }
  defineExpose({ onOpen })
  const onclose = () => {
    visible.value = false
    Object.assign(formModel, formDefault)
  }
</script>

<style scoped lang="scss"></style>
