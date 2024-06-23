<template>
  <el-dialog v-model="visible" :append-to-body="true" :destroy-on-close="true" :width="600" title="菜单设置" center align-center>
    <div style="min-height: 10vh">
      <el-tree ref="treeRef" accordion :props="defaultProps" highlight-current :data="treeList" node-key="id" show-checkbox @check="handleCheck" />
    </div>
    <template #footer>
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary" @click="onSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
  import { ref } from 'vue'
  import { SystemApi } from '@/api/system.js'

  // 确认
  const onSubmit = () => {
    visible.value = false
  }
  const treeRef = ref()

  // 多选框的操作
  const handleCheck = (a) => {
    // 将节点赋值给menuIds
    const menuIds = treeRef.value.getNode(a)
    // 判断节点是否被选中
    if (!menuIds.checked) {
      // 获取父节点
      const node = treeRef.value.getNode(menuIds.parent)
      // 如果父节点不是叶子节点，则将父节点设置为不确定状态
      if (!node.isLeaf) {
        node.indeterminate = true
      }
    }
  }
  const emit = defineEmits(['refresh'])
  // 开关
  const roleId = ref()
  const menuIds = ref([])
  const treeList = ref([])
  const visible = ref(false)
  const onOpen = async (item) => {
    roleId.value = item.id
    // 获取菜单列表
    treeList.value = await SystemApi.getMenuList()
    // 获取角色菜单，将roleId作为参数传递给后台，然后回调res参数
    SystemApi.getMenuRoleList({ roleId: roleId.value }).then((res) => {
      // 初始化menuIds，确保menuIds为空数组
      menuIds.value = []
      // 将回调过来的res 赋值给menuIds
      menuIds.value = res
      // 遍历res
      res.forEach((item) => {
        // 获取树节点，并赋值给node
        const node = treeRef.value.getNode(item)
        // 如果树节点不为空，并且该节点是叶子节点，则调用setChecked方法，将节点设置为选中状态
        // isLeaf 是否叶子节点
        if (node != null && node.isLeaf) {
          treeRef.value.setChecked(node, true)
        }
        // 如果树节点不为空，并且该节点不是选中状态，则调用indeterminate方法，将节点设置为半选中状态
        if (node != null && !node.checked) {
          // indeterminate 是否半选中
          node.indeterminate = true
        }
      })
    })
    visible.value = true
  }
  defineExpose({ onOpen })
  // 关闭
  const onClose = () => {
    visible.value = false
    emit('refresh')
    menuIds.value = []
  }
  // 树形数据
  const defaultProps = {
    label: 'menuName',
    children: 'childrenList'
  }
</script>

<style scoped lang="scss"></style>
