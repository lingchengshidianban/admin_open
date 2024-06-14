/**
 * 表单封装
 */
import { reactive, onMounted } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
// import { sortablejs } from 'sortablejs'

export default function useTable(apis, paras = {}) {
  const page = reactive({
    pageCurrent: 1,
    pageSize: 20,
    totalCount: 0,
    list: [],
    loading: true
  })
  const handlePage = async () => {
    if (apis.page) {
      page.loading = true
      try {
        const res = await apis.page({
          pageCurrent: page.pageCurrent,
          pageSize: page.pageSize,
          ...query,
          ...paras
        })
        if (res) {
          page.list = res.list || res || []
          // 将接口的 totalCount赋值给page.totalCount
          page.totalCount = res.totalCount || 0
        }
        // 排列
        // if (apis.sort) {
        //   await
        // }
      } finally {
        page.loading = false
      }
    }
  }
  const query = reactive({})
  // 查询
  const handleQuery = () => {
    page.pageCurrent = 1
    handlePage()
  }
  // 重置
  const resetQuery = () => {
    for (let i in query) {
      query[i] = ''
    }
    handleQuery()
  }

  onMounted(handlePage)

  // 删除
  const handleDelete = (data, tip = '') => {
    if (apis.delete) {
      ElMessageBox.confirm(tip || '是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        page.loading = true
        try {
          const res = await apis.delete(data)
          await handlePage()
          ElMessage.success({ message: res.message ? res.message : '操作成功' })
        } finally {
          page.loading = false
        }
      })
    }
  }
  // 排列
  // const handlesort = () => {}

  /**
   * 状态改变
   */
  const handleStatus = async (row) => {
    page.loading = true
    if (apis.status) {
      try {
        // 状态改变, 0:禁用 1:启用 判断当前状态
        row.statusId = row.statusId ? 0 : 1
        // 调用接口
        const res = await apis.status({ id: row.id, statusId: row.statusId })
        // 判断接口是否存在
        if (res) {
          ElMessage.success({ message: res.message ? res.message : '操作成功' })
          await handlePage()
        }
      } finally {
        page.loading = false
      }
    }
  }
  return {
    page,
    handlePage,
    query,
    handleQuery,
    resetQuery,
    handleDelete,
    handleStatus
  }
}
