<template>
  <div class="app-container">
    <!-- 搜索条件部分 - Begin -->
    <div class="tumo-table-search">
      <a-input
        v-model="query.username"
        placeholder="请输入名称查询"
        style="width: 200px"
      />
      <a-button type="primary" icon="search" @click="fetchData(pageConf)">
        查询
      </a-button>
    </div>
    <!-- 搜索条件部分 - End -->

    <a-card>
      <!-- 工具栏 - Begin -->
      <div class="tumo-table-toolbar">
        <div class="tumo-table-toolbar-container">
          <div class="tumo-table-toolbar-left" />
          <div class="tumo-table-toolbar-right">
            <a-popover content="刷新">
              <a-button type="link" icon="redo" @click="fetchData(pageConf)" />
            </a-popover>
            <a-popover content="导出Excel">
              <a-button type="link" icon="download" @click="handleExport" />
            </a-popover>
          </div>
        </div>
      </div>
      <!-- 工具栏 - End -->

      <!-- Table表列表部分 - Begin -->
      <a-table
        size="small"
        :columns="columns"
        :row-key="record => record.id"
        :pagination="false"
        :loading="loading"
        :data-source="list"
        :scroll="{ x: 'calc(700px + 50%)'}"
        bordered
      >
        <span slot="type" slot-scope="type">
          <a-tag v-if="type === 1" color="green">正常</a-tag>
          <a-tag v-else color="red">异常</a-tag>
        </span>
        <span slot="action" slot-scope="text, record">
          <a-button type="link" class="primary" @click="$refs.detailModel.init(record.id)">详情</a-button>
          <a-button type="link" class="danger" @click="handleDel(record.id)">删除</a-button>
        </span>
      </a-table>
      <pagination
        v-show="pageConf.total>0"
        :total="pageConf.total"
        :page.sync="pageConf.page"
        :limit.sync="pageConf.limit"
        @pagination="fetchData"
      />
      <!-- Table列表部分 - End -->

      <!-- 详情弹窗 -->
      <detail-model ref="detailModel" />
    </a-card>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import DetailModel from './components/DetailModel'
import { delLog, logList, exportLog } from '@/api/modules/system/log'
import { downFile } from '@/utils'

export default {
  name: 'Index',
  components: { Pagination, DetailModel },
  data() {
    return {
      list: [],
      columns: [
        { title: '操作用户', dataIndex: 'username', key: 'username', fixed: 'left', width: 180 },
        { title: '类型', dataIndex: 'type', key: 'type', scopedSlots: { customRender: 'type' }, align: 'center', width: 80 },
        { title: '请求接口', dataIndex: 'url', key: 'url' },
        { title: '操作描述', dataIndex: 'operation', key: 'operation' },
        { title: '耗时(毫秒)', dataIndex: 'time', key: 'time', align: 'center', width: 100 },
        { title: 'IP地址', dataIndex: 'ip', key: 'ip', align: 'center', width: 130 },
        { title: '操作时间', dataIndex: 'createTime', key: 'createTime', align: 'center', width: 150 },
        { title: '操作', key: 'action', scopedSlots: { customRender: 'action' }, fixed: 'right', align: 'center', width: 150 }
      ],
      query: {},
      pageConf: {
        page: 1,
        limit: 5,
        total: 0
      },
      loading: true
    }
  },
  created() {
    this.fetchData(this.pageConf)
  },
  methods: {
    fetchData(page) {
      this.loading = true
      this.pageConf.page = page.page
      this.pageConf.limit = page.limit
      logList(this.pageConf, this.query).then(res => {
        this.list = res.data.rows
        this.pageConf.total = res.data.total
        this.loading = false
      })
    },
    handleExport() {
      exportLog().then(res => {
        const url = window.URL.createObjectURL(new Blob([res]))
        downFile(url, '日志数据.xlsx')
      })
    },
    handleDel(id) {
      const _this = this
      this.$confirm({
        title: '您确定要删除此条数据吗?',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          delLog(id).then(res => {
            if (res.code === 200) {
              _this.$message
                .success(res.msg)
            } else {
              _this.$message
                .error(res.msg)
            }
            _this.fetchData(_this.pageConf)
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.ant-row {
  margin-bottom: 10px;
}
</style>
