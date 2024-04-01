<template>
  <el-dialog :title="dialogTitle" :visible="visible" @closed="onClose" @opened="onOpen">
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="商户id" prop="merchant_id">
        <el-input v-model="form.merchant_id" />
      </el-form-item>
      <el-form-item label="商户名称" prop="merchant_name">
        <el-input v-model="form.merchant_name" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit('ruleForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addMerchant, getMerchantDetail, updateMerchant } from '@/api/admin/merchant'

const defaultFormData = {
  merchant_id: '',
  merchant_name: ''
}
export default {
  name: 'MerchantDetailDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    merchantId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      form: Object.assign({}, defaultFormData),
      rules: {
        merchant_id: [
          { required: true, message: '商户id必须填写', trigger: 'blur' }
        ],
        merchant_name: [
          { required: true, message: '商户名称必须填写', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    visible: {
      get: function() {
        return this.dialogVisible
      },
      set: function(newValue) {
        this.$emit('close', true)
      }
    },
    dialogTitle: function() {
      return this.merchantId ? '编辑商户' : '添加商户'
    }
  },
  methods: {
    onOpen() {
      if (this.merchantId) {
        getMerchantDetail(this.merchantId).then(res => {
          this.form.merchant_name = res.data.merchant_name
          this.form.merchant_id = res.data.merchant_id
        })
      }
    },
    onClose() {
      this.$emit('close', true)
      this.form = Object.assign({}, defaultFormData)
    },
    handleAddMerchant() {
      addMerchant(this.form).then(res => {
        this.$message.success('创建成功')
        this.$emit('refresh')
        this.onClose()
        this.form = Object.assign({}, defaultFormData)
      })
    },
    handleUpdateMerchant() {
      updateMerchant(this.merchantId, this.form).then(res => {
        this.$message.success('操作成功')
        this.$emit('refresh')
        this.onClose()
        this.form = Object.assign({}, defaultFormData)
      })
    },

    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.merchantId) {
            this.handleAddMerchant()
          } else {
            this.handleUpdateMerchant()
          }
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
