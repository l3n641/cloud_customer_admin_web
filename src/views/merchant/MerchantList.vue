<template>
  <div class="app-container">

    <el-card class="filter-container" shadow="never" />
    <merchant-detail-dialog
      :dialog-visible="merchantDetailDialogVisible"
      :merchant-id="selectMerchantId"
      @close="merchantDetailDialogVisible=false;selectMerchantId=null"
      @refresh="getList"
    />
    <div class="action-container">
      <el-button type="primary" @click="handleAddMerchantDialog"> 添加商户</el-button>
    </div>
    <div class="table-container">
      <el-table
        v-loading="listLoading"
        :data="list"
        style="width: 100%"
        border
      >
        <el-table-column label="id" prop="id" align="center" width="100" />
        <el-table-column label="商户id" align="center" prop="merchant_id" width="200" />
        <el-table-column label="商户名称" align="center" prop="merchant_name" />
        <el-table-column label="操作" align="left" width="100">
          <template slot-scope="scope">
            <div class="action">
              <el-button
                type="info"
                icon="el-icon-edit"
                size="mini"
                @click="handleUpdateMerchant(scope.row)"
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
import { getMerchantList } from '@/api/admin/merchant'
import MerchantDetailDialog from '@/views/merchant/components/MerchantDetailDialog'

const defaultListQuery = {
  page: 1,
  page_size: 10
}
export default {
  name: 'MerchantList',
  components: { MerchantDetailDialog },
  filters: {},
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: [],
      total: null,
      listLoading: true,
      merchantDetailDialogVisible: false,
      selectMerchantId: null
    }
  },
  computed: {
    selectedTab: {
      get() {
        return this.listQuery.user_type ? this.listQuery.user_type.toString() : null
      },
      set(value) {
        this.listQuery.user_type = parseInt(value)
      }
    }
  },
  watch: {},
  mounted() {
  },
  created() {
    this.getList()
  },
  methods: {
    handleUpdateMerchant(data) {
      this.merchantDetailDialogVisible = true
      this.selectMerchantId = data.id
    },
    handleAddMerchantDialog() {
      this.merchantDetailDialogVisible = true
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
    getList() {
      this.listLoading = true
      getMerchantList(this.listQuery).then(res => {
        const data = res.data
        this.listLoading = false
        this.list = data.item
        this.total = data.total
      })
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
