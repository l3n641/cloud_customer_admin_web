<template>
  <el-date-picker
    v-model="date"
    type="datetimerange"
    align="center"
    unlink-panels
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    value-format="timestamp"
    :default-time="['0:00:00', '23:59:59']"
    :picker-options="pickerOptions"
  />
</template>

<script>

import { getTimeRangeEndWithToday } from '@/utils/functions'

export default {
  name: 'DateRange',
  props: {
    dateStart: {
      type: Number,
      default: 0
    },
    dateEnd: {
      type: Number,
      default: 0
    }

  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              const range = getTimeRangeEndWithToday(1)
              picker.$emit('pick', range)
            }
          },
          {
            text: '最近一周',
            onClick(picker) {
              const range = getTimeRangeEndWithToday(7)
              picker.$emit('pick', range)
            }
          },
          {
            text: '最近30天',
            onClick(picker) {
              const range = getTimeRangeEndWithToday(30)
              picker.$emit('pick', range)
            }
          }
        ]
      }

    }
  },
  computed: {
    date: {
      get() {
        let start = this.dateStart
        let end = this.dateEnd
        const range = getTimeRangeEndWithToday(1)
        if (!start) {
          start = range[0]
        }
        if (!end) {
          end = range[1]
        }
        return [start, end]
      },
      set(value) {
        this.$emit('changeDate', value)
      }
    }
  }

}
</script>

<style scoped>

</style>
