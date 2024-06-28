<template>
  <div class="paging">
    <el-pagination
      v-show="props.total > 0"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :total="props.total"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    total: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 20
    }
  })

  const emit = defineEmits(['update:current-page', 'update:page-size', 'pagination'])
  const currentPage = computed({
    get: () => props.currentPage,
    set: (val) => {
      emit('update:current-page', val)
    }
  })

  const pageSize = computed({
    get: () => props.pageSize,
    set: (val) => {
      emit('update:page-size', val)
    }
  })
  const handleSizeChange = (val) => {
    if (currentPage.value * val > props.total) {
      currentPage.value = 1
    }
    emit('pagination', { currentPage: currentPage.value, pageSize: val })
  }
  const handleCurrentChange = (val) => {
    emit('pagination', { currentPage: val, pageSize: pageSize.value })
  }
  defineOptions({ name: 'Pagination' })
</script>

<style scoped lang="scss">
  .paging {
    display: flex;
    justify-content: flex-end;
  }
</style>
