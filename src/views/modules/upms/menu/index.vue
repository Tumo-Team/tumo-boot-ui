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
        <span slot="type" slot-scope="type, record">
          <a-tag v-if="record.type === 'menu'" color="blue">菜单</a-tag>
          <a-tag v-if="record.type === 'button'" color="red">按钮</a-tag>
        </span>
        <span slot="icon" slot-scope="icon, record">
          <a-icon v-if="record.meta.icon !== null" :type="record.meta.icon" />
        </span>
        <span slot="hidden" slot-scope="hidden">
          <a-popover :content="hidden ? '隐藏' : '显示'">
            <a-badge :status="hidden ? 'error' : 'success'" />
          </a-popover>
        </span>
        <span slot="frame" slot-scope="frame">
          <a-popover :content="frame ? '外链' : '内部'">
            <a-tag :color="frame ? '#f50' : '#87d068'">{{ frame ? '外链' : '内部' }}</a-tag>
          </a-popover>
        </span>
        <span slot="action" slot-scope="text, record">
          <a-button type="link" @click="$refs.editForm.init(record.id, 'child')">新增子节点</a-button>
          <a-button type="link" class="primary" @click="$refs.editForm.init(record.id)">修改</a-button>
          <a-dropdown>
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              更多 <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
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
    </a-card>
  </div>
</template>

<script>
import EditForm from './components/EditForm'
import { delMenu, menuTree, exportMenu } from '@/api/modules/upms/menu'
import { downFile } from '@/utils'

export default {
  name: 'Index',
  components: { EditForm },
  data() {
    return {
      list: [],
      columns: [
        { title: '菜单名称', dataIndex: 'name', key: 'name' },
        { title: '菜单路径', dataIndex: 'path', key: 'path' },
        { title: '权限标识', dataIndex: 'perms', key: 'perms', width: 120, align: 'center' },
        { title: '类型', dataIndex: 'type', key: 'type', scopedSlots: { customRender: 'type' }, width: 80, align: 'center' },
        { title: '图标', dataIndex: 'icon', key: 'icon', scopedSlots: { customRender: 'icon' }, width: 80, align: 'center' },
        { title: '组件路径', dataIndex: 'component', key: 'component' },
        { title: '是否隐藏', dataIndex: 'hidden', key: 'hidden', scopedSlots: { customRender: 'hidden' }, width: 80, align: 'center' },
        { title: '是否外链', dataIndex: 'frame', key: 'frame', scopedSlots: { customRender: 'frame' }, width: 80, align: 'center' },
        { title: '操作', key: 'action', scopedSlots: { customRender: 'action' }, fixed: 'right', width: 200, align: 'center' }
      ],
      loading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      menuTree().then(res => {
        this.list = res.data
        this.loading = false
      })
    },
    handleExport() {
      exportMenu().then(res => {
        const url = window.URL.createObjectURL(new Blob([res]))
        downFile(url, '菜单数据.xlsx')
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
          delMenu(id).then(res => {
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
