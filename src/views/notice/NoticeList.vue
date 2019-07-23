<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div class="header">
        <div class="title">公告列表</div>
      </div>
      <!-- 表格 -->
      <lin-table
        :tableColumn="tableColumn"
        :tableData="tableData"
        :operate="operate"
        @handleEdit="handleEdit"
        @handleDelete="handleDelete"
        @row-click="rowClick"
        v-loading="loading"></lin-table>
    </div>

    <!-- 编辑页面 -->
    <edit-page v-else @editClose="editClose" :editNoticeId="editNoticeId"></edit-page>

  </div>
</template>

<script>
import LinTable from '@/components/base/table/lin-table'
import dayjs from 'dayjs'

import notice from '@/models/notice'
import editPage from './noticeEdit'

export default {
  components: {
    LinTable,
    editPage,
  },
  data() {
    return {
      tableColumn: [{ prop: 'title', label: '标题' }, { prop: 'createTime', label: '发布时间' }],
      tableData: [],
      operate: [],
      showEdit: false,
      editNoticeId: 1,
    }
  },
  async created() {
    this.loading = true
    this.getNotices()
    this.operate = [{ name: '编辑', func: 'handleEdit', type: 'primary' }, {
      name: '删除',
      func: 'handleDelete',
      type: 'danger',
      auth: '删除公告',
    }]
    this.loading = false
  },
  methods: {
    async getNotices() {
      try {
        const notices = await notice.getNotices()
        notices.forEach((el) => {
          // eslint-disable-next-line no-param-reassign
          el.createTime = dayjs(el.createTime).format('YYYY-MM-DD HH:mm')
        })
        this.tableData = notices
      } catch (error) {
        if (error.error_code === 10020) {
          this.tableData = []
        }
      }
    },
    handleEdit(val) {
      console.log('val', val)
      this.showEdit = true
      this.editNoticeId = val.row.id
    },
    handleDelete(val) {
      this.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const res = await notice.delectNotice(val.row.id)
        if (res.error_code === 0) {
          this.getNotices()
          this.$message({
            type: 'success',
            message: `${res.msg}`,
          })
        }
      })
    },
    rowClick() {

    },
    editClose() {
      this.showEdit = false
      this.getNotices()
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  padding: 0 30px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      height: 59px;
      line-height: 59px;
      color: $parent-title-color;
      font-size: 16px;
      font-weight: 500;
    }
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }
}
</style>
