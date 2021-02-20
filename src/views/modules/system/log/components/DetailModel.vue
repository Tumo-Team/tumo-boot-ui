<template>
  <div v-if="visible">
    <!-- 日志详情弹窗 - Begin -->
    <a-drawer
      title="操作日志详情"
      :visible.sync="visible"
      placement="right"
      width="40%"
      :destroy-on-close="true"
      @close="handleClose"
    >
      <a-descriptions>
        <a-descriptions-item label="操作用户">
          {{ form.username }}
        </a-descriptions-item>
        <a-descriptions-item label="日志类型">
          <a-tag v-if="form.type === 1" color="green">正常</a-tag>
          <a-tag v-else color="red">异常</a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="操作描述">
          {{ form.operation }}
        </a-descriptions-item>
        <a-descriptions-item label="请求接口">
          {{ form.url }}
        </a-descriptions-item>
        <a-descriptions-item label="请求耗时">
          {{ form.time }}
        </a-descriptions-item>
        <a-descriptions-item label="操作方法">
          {{ form.method }}
        </a-descriptions-item>
        <a-descriptions-item label="操作参数">
          {{ form.params }}
        </a-descriptions-item>
        <a-descriptions-item label="IP地址">
          {{ form.ip }}
        </a-descriptions-item>
        <a-descriptions-item label="用户代理">
          {{ form.userAgent }}
        </a-descriptions-item>
        <a-descriptions-item label="操作时间">
          {{ form.createTime }}
        </a-descriptions-item>
      </a-descriptions>
    </a-drawer>
    <!-- 日志详情弹窗 - End -->
  </div>

</template>

<script>
import { findByLogId } from '@/api/modules/system/log'

export default {
  name: 'DetailModel',
  data() {
    return {
      visible: false,
      form: {}
    }
  },
  methods: {
    handleClose() {
      this.form = {}
      this.visible = false
    },

    init(id) {
      if (id !== undefined) {
        findByLogId(id).then(res => {
          this.form = res.data
          this.visible = true
        })
      }
    }
  }
}
</script>

<style scoped>
/deep/ .ant-descriptions-item {
  display: block !important;
}
</style>
