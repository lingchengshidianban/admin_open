<template>
  <!--  轮播管理-->
  <el-form :model="query" inline>
    <el-form-item>
      <enum-select v-model="query.carouselTarget" :enum-name="'TargetEnum'" :title="'请选择跳转方式'" />
    </el-form-item>
    <el-form-item>
      <enum-select v-model="query.statusId" :enum-name="'StatusIdEnum'" :title="'请选择状态'" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleQuery()">查询</el-button>
      <el-button type="primary" @click="resetQuery">重置</el-button>
      <el-button type="primary" @click="openFormModel">添加轮播</el-button>
    </el-form-item>
  </el-form>
  <el-table v-loading="page.loading" :data="page.list" row-key="id" class="drag-table">
    <el-table-column label="图片" :min-width="120">
      <template #default="scope">
        <img :src="scope.row.carouselImg" alt="广告图片" style="width: auto; height: 72px; border-radius: 5px" />
      </template>
    </el-table-column>
    <el-table-column label="访问地址" :min-width="120">
      <template #default="scope">
        <el-link :href="scope.row.carouselUrl" target="_blank" type="primary">{{ scope.row.carouselUrl }}</el-link>
      </template>
    </el-table-column>
    <el-table-column label="跳转方式">
      <template #default="scope">
        <enum-view :enum-name="'TargetEnum'" :enum-value="scope.row.carouselTarget" />
      </template>
    </el-table-column>
    <el-table-column label="状态" :min-width="120">
      <template #default="scope">
        <enum-view :enum-name="'StatusIdEnum'" :enum-value="scope.row.statusId" />
      </template>
    </el-table-column>
    <el-table-column label="操作" :min-width="100">
      <template #default="scope">
        <el-button text type="primary" @click="openFormModel(scope.row)">编辑</el-button>
        <el-divider direction="vertical" />
        <el-dropdown>
          <el-button text type="primary">更多操作</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <el-button v-permission="'website:carousel:delete'" text type="primary" @click="handleDelete(scope.row)">删除</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleStatus(scope.row)">
                <el-button v-if="scope.row.statusId === 0" v-permission="'website:carousel:edit'" text type="primary">启用</el-button>
                <el-button v-if="scope.row.statusId === 1" v-permission="'website:carousel:edit'" text type="primary">禁用</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
  <CarouselForm ref="formRef" @refresh="handlePage" />
</template>

<script setup>
  import EnumSelect from '@/components/Enum/Select/index.vue'
  import EnumView from '@/components/Enum/View/index.vue'
  import CarouselForm from './CarouselForm.vue'
  import useTable from '@/utils/table.js'
  import { SystemApi } from '@/api/system.js'
  import { ref } from 'vue'

  const formRef = ref(null)
  const openFormModel = (row) => {
    formRef.value.onOpen(row)
  }

  const { page, query, handleQuery, handlePage, handleDelete, handleStatus, resetQuery } = useTable({
    page: SystemApi.carouselPage,
    delete: SystemApi.carouselDelete,
    status: SystemApi.carouselEdit,
    sort: SystemApi.carouselSort
  })
</script>

<style scoped lang="scss"></style>
