<template>
  <el-dialog title="创建客服" :visible="visible" @close="onClose" @opened="onOpen">
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="Email" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" />
      </el-form-item>
      <el-form-item label="商户" prop="password">
        <merchant-check-box :merchant-ids="form.merchant_group" @change="changeMerchantGroup" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit('ruleForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { createChatSupport, getChatSupportDetail, updateChatSupport } from '@/api/admin/chatSupport'
import MerchantCheckBox from '@//views/components/Merchant/MerchantCheckBox'

const defaultFormData = {
  email: '',
  password: '',
  merchant_group: []
}
export default {
  name: 'ChatSupportDialog',
  components: { MerchantCheckBox },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    userId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      form: Object.assign({}, defaultFormData),
      rules: {
        email: [
          { required: true, trigger: 'blur' },
          { type: 'email', trigger: ['blur'] }
        ],
        password: [
          { required: true, message: '密码必须填写', trigger: 'blur' }
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

    }
  },
  methods: {
    onOpen() {
      if (this.userId) {
        getChatSupportDetail(this.userId).then(res => {
          delete this.rules.password
          this.form.email = res.data.email
          const merchant_group = []
          if (res.data.merchant_group) {
            for (const item of res.data.merchant_group) {
              merchant_group.push(item.merchant_id)
            }
          }
          this.form.merchant_group = merchant_group
        })
      }
    },
    onClose() {
      this.$emit('close', true)
    },
    changeMerchantGroup(value) {
      this.form.merchant_group = value
    },
    handleCreateCustomer() {
      createChatSupport(this.form).then(
        () => {
          this.$message.success('添加成功')
          this.$emit('refresh')
          this.onClose()
          this.form = Object.assign({}, defaultFormData)
        })
    },
    handleUpdateCustomer() {
      updateChatSupport(this.userId, this.form).then(
        () => {
          this.$message.success('更新成功')
          this.$emit('refresh')
          this.onClose()
          this.form = Object.assign({}, defaultFormData)
        })
    },
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.userId) {
            this.handleUpdateCustomer()
          } else {
            this.handleCreateCustomer()
          }
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
