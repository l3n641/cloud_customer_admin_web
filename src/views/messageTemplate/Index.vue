<template>
  <div class="app-container">
    <message-template-dialog
      :dialog-visible="messageTemplateDialogVisible"
      :msg-template-id="selectedTemplateId"
      @close="handleCloseTmpDialog"
      @referer="getList"
    />
    <div class="action-container">
      <el-button type="primary" @click="messageTemplateDialogVisible=true"> 添加消息模板</el-button>
    </div>
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"/>
        <span>筛选搜索</span>
        <el-button style="float: right" type="primary" size="mini" @click="handleSearchList()">
          查询结果
        </el-button>
      </div>
      <div class="search_form">
        <el-form :inline="true" :model="listQuery" size="small" label-width="100px">
          <el-form-item label="语种">
            <el-input v-model="listQuery.lang" clearable/>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="listQuery.msg_type" clearable @clear="listQuery.msg_type=null">
              <el-option label="欢迎用语" :value="1"/>
              <el-option label="离线用语" :value="2"/>
              <el-option label="在线用语" :value="3"/>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div/>
    </el-card>

    <div class="table-container">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="msg_type" label="类型" width="150">
          <template slot-scope="scope">
            {{ scope.row.msg_type | msgTypeToStr }}
          </template>
        </el-table-column>
        <el-table-column prop="lang" label="语种" width="100"/>
        <el-table-column prop="content" label="内容"/>
        <el-table-column label="操作" align="left" width="150">
          <template slot-scope="scope">
            <div class="action">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="handleEditTemplate(scope.row.id)"
              />
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="handleDelMessageTemplate(scope.row.id)"
              />
            </div>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.page_size"
        :page-sizes="[20,50,100]"
        :current-page.sync="listQuery.page"
        :total="tableDataTotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

  </div>
</template>

<script>
import MessageTemplateDialog from '@/views/messageTemplate/components/MessageTemplateDialog'
import {getMessageTemplate, deleteMessageTemplate} from '@/api/admin/messageTemplate'

const defaultQuery = {
  page: 1,
  page_size: 20,
  lang: '',
  msg_type: null
}

export default {
  name: 'MessageTemplateList',
  components: {MessageTemplateDialog},
  filters: {
    msgTypeToStr: function (value) {
      const msgTypeMap = {
        1: '欢迎用语',
        2: '离线用语',
        3: '在线用语'
      }
      if (!value) return ''
      return msgTypeMap[value]
    }
  },
  data() {
    return {
      tableData: [],
      tableDataTotal: 0,
      listQuery: Object.assign({}, defaultQuery),
      messageTemplateDialogVisible: false,
      selectedTemplateId: null

    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    handleCloseTmpDialog() {
      this.messageTemplateDialogVisible = false
      this.selectedTemplateId = null
    },
    handleDelMessageTemplate(id) {
      this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMessageTemplate(id).then(() => {
          this.$message.success('删除成功')
          this.getList()
        })
      })
    },
    getList() {
      getMessageTemplate(this.listQuery).then(res => {
        this.tableData = res.data.item
        this.tableDataTotal = res.data.total
      })
    },
    handleSizeChange(val) {
      this.listQuery.page = 1
      this.listQuery.page_size = val
      this.getList()
    },
    handleSearchList() {
      this.listQuery.page = 1
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleEditTemplate(id) {
      this.selectedTemplateId = id
      this.messageTemplateDialogVisible = true
    }
  }
}
</script>

<style scoped>

</style>
