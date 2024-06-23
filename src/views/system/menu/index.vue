<template>
  <el-form inline :model="query">
    <el-form-item>
      <el-input v-model="query.menuName" placeholder="请输入搜索内容" prefix-icon="search" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleQuery">查询</el-button>
      <el-button type="primary" @click="resetQuery">刷新</el-button>
      <el-button type="primary" @click="onUnpackForm">添加菜单</el-button></el-form-item
    >
  </el-form>
  <el-table v-loading="page.loading" :data="page.list" row-key="id" :tree-props="{ children: 'childrenList', hasChildren: 'hasChildren' }">
    <el-table-column label="名称" :min-width="100">
      <template #default="scope">
        <icon :name="scope.row.menuIcon"></icon>
        <span style="padding-left: 10px">{{ scope.row.menuName }}</span>
      </template>
    </el-table-column>
    <el-table-column label="类型" prop="menuType" :min-width="50">
      <template #default="scope">
        <enum-view :enum-name="'MenuTypeEnum'" :enum-value="scope.row.menuType" />
      </template>
    </el-table-column>
    <el-table-column label="路径/组件" :min-width="100">
      <template #default="scope">
        <el-tag v-if="scope.row.path">{{ scope.row.path }}</el-tag>
        <br />
        {{ scope.row.component }}
      </template>
    </el-table-column>
    <el-table-column label="前端权限/后端接口" prop="permission" :min-width="100">
      <template #defaul="scope">
        <el-tag v-if="scope.row.permission">{{ scope.row.permission }}</el-tag>
        <br />
        {{ scope.row.apis }}
      </template>
    </el-table-column>
    <el-table-column label="排序" property="sort" :min-width="50"></el-table-column>
    <el-table-column label="状态" :min-width="50">
      <template #default="scope">
        <enum-view :enum-name="'StatusIdEnum'" :enum-value="scope.row.statusId" />
      </template>
    </el-table-column>
    <el-table-column label="操作" :min-width="100">
      <template #default="scope">
        <el-button type="primary" text>新增</el-button>
        <el-divider direction="vertical" />
        <el-button type="primary" text @click="onUnpackForm(scope.row)">编辑</el-button>
        <el-divider direction="vertical" />
        <el-dropdown>
          <el-button type="primary" text>更多</el-button>
          <template #dropdown>
            <el-dropdown-item>
              <el-button type="danger" text @click="handleDelete(scope.row)">删除</el-button>
            </el-dropdown-item>
            <el-dropdown-item @click="handleStatus(scope.row)">
              <el-button v-if="scope.row.statusId === 1" type="primary" text>禁用</el-button>
              <el-button v-if="scope.row.statusId === 0" type="primary" text>启用</el-button>
            </el-dropdown-item>
          </template>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
  <MenuForm ref="formRef" @refresh="handlePage" />
</template>

<script setup>
  import { ref } from 'vue'
  import useTable from '@/utils/table.js'
  import { SystemApi } from '@/api/system.js'
  import EnumView from '@/components/Enum/View/index.vue'
  import MenuForm from './MenuForm.vue'

  const formRef = ref()

  const onUnpackForm = (row) => {
    formRef.value.onOpen(row)
  }

  const { page, query, handleDelete, handleStatus, handlePage, handleQuery, resetQuery } = useTable({
    page: SystemApi.getMenuList
  })
</script>

<style scoped lang="scss"></style>
