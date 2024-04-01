<template>
  <el-checkbox-group v-model="value">
    <el-checkbox
      v-for="item in options"
      :key="item.id"
      :label="item.id"
    >{{ item.merchant_id }}
    </el-checkbox>
  </el-checkbox-group>

</template>

<script>
import { getMerchantList } from '@/api/admin/merchant'

export default {
  name: 'MerchantCheckBox',
  props: {
    merchantIds: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      options: []
    }
  },
  computed: {
    value: {
      get() {
        if (this.merchantIds) {
          return this.merchantIds
        }
        return []
      },
      set(value) {
        this.$emit('change', value)
      }
    }
  },
  created() {
    getMerchantList().then(res => {
      this.options = res.data.item
    })
  }
}
</script>

<style>

</style>
