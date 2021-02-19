<template>
  <div class="app-container">
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
          <a-button type="link" @click="$refs.editForm.init(record.id, 'child')">新增子节点</a-button>
          <a-button type="link" class="primary" @click="$refs.editForm.init(record.id)">修改</a-button>
          <a-dropdown>
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              更多 <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item @click="$refs.userModel.init(record.id)">
                <a-button type="link" class="primary">用户列表</a-button>
              </a-menu-item>
              <a-menu-item @click="handleDel(record.id)">
                <a-button type="link" class="danger">删除</a-button>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
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
import { deptTree, delDept, exportDept } from '@/api/modules/upms/dept'
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
        { title: '操作', key: 'action', scopedSlots: { customRender: 'action' }, fixed: 'right', width: 200 }
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
