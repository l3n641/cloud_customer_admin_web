<template>
  <el-dialog title="保存模板" :visible="visible" @close="onClose" @opened="onOpen">
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="类型" prop="msg_type">
        <el-select v-model="form.msg_type" placeholder="请选择">
          <el-option
            v-for="item in msgTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="语种" prop="lang">
        <el-input v-model="form.lang"/>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model="form.content" type="textarea"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit('ruleForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>

import {
  createMessageTemplate,
  getMessageTemplateDetail,
  updateMessageTemplate
} from '@/api/admin/messageTemplate'

const defaultFormData = {
  lang: '',
  msg_type: null,
  content: ''
}
export default {
  name: 'MessageTemplateDialog',
  components: {},
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    msgTemplateId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      form: Object.assign({}, defaultFormData),
      msgTypeList: [
        {
          value: 1,
          label: '欢迎用语'
        },
        {
          value: 2,
          label: '客服离线用语'
        },
        {
          value: 3,
          label: '客服在线用语'
        }
      ],
      rules: {
        msg_type: [{required: true, trigger: 'blur'}],
        content: [{required: true, trigger: 'blur'}],
        lang: [{required: true, trigger: 'blur'}, {min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur'}]
      }
    }
  },
  computed: {
    visible: {
      get: function () {
        return this.dialogVisible
      },
      set: function (newValue) {
        this.$emit('close', true)
      }

    }
  },
  methods: {
    onOpen() {
      if (this.msgTemplateId) {
        getMessageTemplateDetail(this.msgTemplateId).then(res => {
          this.form.content = res.data.content
          this.form.msg_type = res.data.msg_type
          this.form.lang = res.data.lang
        })
      }
    },
    onClose() {
      this.form = Object.assign({}, defaultFormData)
      this.$emit('close', true)
    },
    handleCreate() {
      createMessageTemplate(this.form).then(res => {
        this.$message.success('创建成功')
        this.$emit('referer')
        this.onClose()
      })
    },
    handleUpdate() {
      updateMessageTemplate(this.msgTemplateId, this.form).then(res => {
        this.$message.success('更新成功')
        this.$emit('referer')
        this.onClose()
      })
    },
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.msgTemplateId) {
            this.handleUpdate()
          } else {
            this.handleCreate()
          }
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
