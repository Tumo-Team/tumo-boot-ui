<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :show-ok-btn="false"
    :title="'字典项'"
    width="50%"
    :cancelText="'关闭'"
    @close="handleClose"
  >
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增字典项 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              // auth: Auth.system.oss.update,
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record.id),
            },
            {
              // auth: Auth.system.oss.delete,
              disabled: record.isSystem,
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record.id),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <ItemFormModal @register="registerModal" @success="handleSuccess" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { deleteDictItem, getDictItemPage } from '/@/api/modules/system/dictItem';
  import { BasicTable, TableAction, useTable } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { itemColumns } from './data';
  import ItemFormModal from './ItemFormModal.vue';

  export default defineComponent({
    name: 'ItemModal',
    components: { BasicDrawer, BasicTable, TableAction, ItemFormModal },
    emits: ['register'],
    setup(_) {
      const [registerModal, { openModal }] = useModal();
      let dictId = null;
      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        setDrawerProps({ confirmLoading: false });
        dictId = data.id;
        handleSuccess();
      });

      const [registerTable, { reload }] = useTable({
        title: '字典项列表',
        columns: itemColumns,
        api: getDictItemPage,
        beforeFetch: beforeFetchHandler,
        useSearchForm: false,
        showTableSetting: true,
        showIndexColumn: false,
        bordered: true,
        pagination: true,
        tableSetting: { fullScreen: true },
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function beforeFetchHandler(params) {
        params.dictId = dictId;
      }

      function handleCreate() {
        openModal(true, {
          dictId,
          isUpdate: false,
        });
      }
      function handleEdit(id: string | number) {
        openModal(true, {
          id,
          dictId,
          isUpdate: true,
        });
      }

      async function handleDelete(id) {
        await deleteDictItem(id);
        reload();
      }

      function handleClose() {
        closeDrawer();
      }

      function handleSuccess() {
        reload();
      }

      return {
        BasicTable,
        registerTable,
        registerModal,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleClose,
        handleSuccess,
      };
    },
  });
</script>
