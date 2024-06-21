<template>
  <div style="display: flex; margin-bottom: 20px">
    <el-form :model="query" inline label-width="80px">
      <el-form-item>
        <el-button v-permission="'category:save'" type="primary" @click="openFormModel()">添加分类</el-button>
        <el-button @click="resetQuery()">刷新</el-button>
      </el-form-item>
    </el-form>
  </div>
  <el-table v-loading="page.loading" :data="page.list" :tree-props="{ children: 'childrenList' }" row-key="id">
    <el-table-column label="名称" prop="categoryName">
      <template #default="scope">
        <span>{{ scope.row.categoryName }}</span>
      </template>
    </el-table-column>
    <el-table-column label="排序" prop="sort" />
    <el-table-column label="状态">
      <template #default="scope">
        <EnumView :enum-value="scope.row.statusId" :enum-name="'StatusIdEnum'" />
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button v-permission="'category:save'" text type="primary" @click="openFormModel(null, scope.row.id)">添加</el-button>
        <el-divider direction="vertical" />
        <el-button v-permission="'category:edit'" text type="primary" @click="openFormModel(scope.row)">编辑</el-button>
        <el-divider direction="vertical" />
        <el-dropdown>
          <el-button text type="primary">更多操作</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <el-button type="danger" text @click="handleDelete(scope.row)">删除</el-button>
              </el-dropdown-item>
              <el-dropdown-item @click="handleStatus(scope.row)">
                <el-button v-if="scope.row.statusId === 0" text type="primary">启用</el-button>
                <el-button v-else type="primary" text>禁用</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
  <CategoryForm ref="formModel" @ratechange="handlePage" />
</template>

<script setup>
  import { ref } from 'vue'
  import EnumView from '@/components/Enum/View/index.vue'
  import CategoryForm from './CategoryForm.vue'
  import useTable from '@/utils/table.js'
  import { courseApi } from '@/api/course.js'

  const formModel = ref(false)
  const openFormModel = (item = null, parentId = '') => {
    formModel.value.onOpen(item, parentId)
  }
  const { page, query, handleStatus, handlePage, resetQuery, handleDelete } = useTable({
    page: courseApi.categoryList,
    status: courseApi.categoryEdit,
    delete: courseApi.categoryDelete
  })
</script>

<style scoped lang="scss"></style>
