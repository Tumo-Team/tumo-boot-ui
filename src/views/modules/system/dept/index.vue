<template>
  <div class="app-container">
    <!-- 搜索条件部分 - Begin -->
    <div class="tumo-table-search">
      <a-input
        v-model="query.name"
        placeholder="请输入名称查询"
        style="width: 200px"
      />
      <a-button type="primary" icon="search" @click="fetchData()">
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
            <a-popover content="新增">
              <a-button type="link" icon="plus" @click="$refs.editForm.init()" />
            </a-popover>
            <a-popover content="刷新">
              <a-button type="link" icon="redo" @click="fetchData" />
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
        <span slot="action" slot-scope="text, record">
          <a-popover content="新增子级节点">
            <a-button type="dashed" size="small" @click="$refs.editForm.init(record.id, 'child')">
              <a-icon type="plus" />
            </a-button>
          </a-popover>
          <a-popover content="用户">
            <a-button type="dashed" size="small" @click="$refs.userModel.init(record.id)">
              <a-icon type="contacts" theme="twoTone" two-tone-color="#1890ff" />
            </a-button>
          </a-popover>
          <a-popover content="修改">
            <a-button type="dashed" size="small" @click="$refs.editForm.init(record.id)">
              <a-icon type="edit" theme="twoTone" two-tone-color="#52c41a" />
            </a-button>
          </a-popover>
          <a-popover content="删除">
            <a-button type="dashed" size="small" @click="handleDel(record.id)">
              <a-icon type="delete" theme="twoTone" two-tone-color="#f5222d" />
            </a-button>
          </a-popover>
        </span>
      </a-table>
      <!-- Table列表部分 - End -->

      <!-- 新增/修改弹窗 -->
      <edit-form ref="editForm" @refresh="fetchData()" />

      <!-- 用户列表弹窗 -->
      <user-model ref="userModel" />
    </a-card>
  </div>
</template>

<script>
import EditForm from './components/EditForm'
import UserModel from './components/UserModel'
import { deptTree, delDept, exportDept } from '@/api/modules/system/dept'
import { downFile } from '@/utils'

export default {
  name: 'Index',
  components: { EditForm, UserModel },
  data() {
    return {
      list: [],
      columns: [
        { title: '部门名称', dataIndex: 'name', key: 'name' },
        { title: '描述', dataIndex: 'des', key: 'des' },
        { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
        { title: '操作', key: 'action', scopedSlots: { customRender: 'action' }, fixed: 'right', width: 155 }
      ],
      query: {},
      loading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      deptTree(this.query).then(res => {
        this.list = res.data
        this.loading = false
      })
    },
    handleExport() {
      exportDept().then(res => {
        const url = window.URL.createObjectURL(new Blob([res]))
        downFile(url, '部门数据.xlsx')
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
          delDept(id).then(res => {
            if (res.code === 200) {
              _this.$message
                .success(res.msg)
            } else {
              _this.$message
                .error(res.msg)
            }
            _this.fetchData()
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
