<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search" />
        <span>筛选搜索</span>
        <el-button style="float: right" type="primary" size="mini" @click="handleSearchList()">
          查询结果
        </el-button>
      </div>
      <div class="search_form">
        <el-form :inline="true" :model="listQuery" size="small" label-width="100px">
          <el-form-item label="Email">
            <el-input v-model="listQuery.email" />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="listQuery.status" clearable @clear="listQuery.status=null">
              <el-option label="正常" :value="1" />
              <el-option label="冻结" :value="0" />
            </el-select>
          </el-form-item>
          <el-form-item label="是否在线">
            <el-select v-model="listQuery.chat_user_is_online" clearable @clear="listQuery.chat_user_is_online=null">
              <el-option label="在线" :value="1" />
              <el-option label="离线" :value="0" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div />
    </el-card>
    <chat-support-dialog
      :dialog-visible="customerDialogVisible"
      :user-id="selectedCustomerId"
      @close="customerDialogVisible=false"
    />
    <div class="action-container">
      <el-button type="primary" @click="handleOpenCustomerDialog"> 添加客服账号</el-button>
    </div>
    <div class="table-container">
      <el-table
        v-loading="listLoading"
        :data="list"
        style="width: 100%"
        border
        @sort-change="sortChange"
      >
        <el-table-column label="id" prop="id" align="center" width="100" />
        <el-table-column label="Email" align="center" prop="email" />
        <el-table-column label="最后登录时间" align="center" sortable="custom" prop="chat_user_login_time" width="200" />
        <el-table-column label="是否在线" align="center" width="80">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.chat_user_is_online===1" type="success">在线</el-tag>
            <el-tag v-else type="danger">离线</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="账号状态" align="center" width="150">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              style="display: block"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="正常"
              inactive-text="冻结"
              :active-value="1"
              :inactive-value="0"
              @change="handleChangeUserStatus(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="注册时间" align="center">
          <template slot-scope="scope">
            <div> {{ scope.row.create_at }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="left" width="100">
          <template slot-scope="scope">
            <div class="action">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="handleEditCustomerInfo(scope.row.id)"
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
        :page-sizes="[10,50,100]"
        :current-page.sync="listQuery.page"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

  </div>

</template>

<script>
import { getChatSupportList } from '@/api/admin/chatSupport'
import ChatSupportDialog from '@/views/chatSupport/components/ChatSupportDialog'

const defaultListQuery = {
  page: 1,
  page_size: 10,
  email: '',
  is_online: null,
  status: null,
  sort_field: null,
  order_by: null
}
export default {
  name: 'UserList',
  components: { ChatSupportDialog },
  filters: {},
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: [],
      total: null,
      listLoading: true,
      customerDialogVisible: false,
      selectedCustomerId: null
    }
  },
  computed: {},
  watch: {},
  mounted() {
  },
  created() {
    this.getList()
  },
  methods: {
    handleEditCustomerInfo(id) {
      this.customerDialogVisible = true
      this.selectedCustomerId = id
    },
    handleOpenCustomerDialog() {
      this.customerDialogVisible = true
    },
    handleSearchList() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.page = 1
      this.listQuery.page_size = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    sortChange({ column, prop, order }) {
      this.listQuery.sort_field = prop
      if (!order) {
        this.listQuery.order_by = null
      } else if (order === 'ascending') {
        this.listQuery.order_by = 'asc'
      } else {
        this.listQuery.order_by = 'desc'
      }
      this.getList()
    },
    getList() {
      this.listLoading = true
      getChatSupportList(this.listQuery).then(res => {
        this.listLoading = false
        this.list = res.data.item
        this.total = res.data.total
      })
    },
    handleChangeUserStatus(row) {
    }

  }
}
</script>

<style scoped>
.action {
  display: flex;
  flex-direction: column;
}

.el-button + .el-button {
  margin-left: 0px;
}

.el-switch {
  height: 30px;
}

.action-container {
  margin: 5px 0px;
}
</style>
