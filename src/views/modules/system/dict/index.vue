<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button v-auth="Auth.system.dict.add" type="primary" @click="handleCreate">
          新增字典
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                auth: Auth.system.dict.update,
                icon: 'clarity:bullet-list-line',
                onClick: handleInfo.bind(null, record.id),
              },
              {
                auth: Auth.system.dict.update,
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record.id),
              },
              {
                auth: Auth.system.dict.delete,
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
      </template>
    </BasicTable>
    <FormModal @register="registerModal" @success="handleSuccess" />
    <ItemModal @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { getDictPage, deleteDict } from '/@/api/modules/system/dict';
  import Auth from '/@/settings/constants/auth';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';

  import { useModal } from '/@/components/Modal';
  import { useDrawer } from '/@/components/Drawer';
  import FormModal from './FormModal.vue';

  import ItemModal from './ItemModal.vue';
  import { columns, searchFormSchema } from './data';

  export default defineComponent({
    name: 'Index',
    components: { BasicTable, FormModal, ItemModal, TableAction },
    setup() {
      const [registerModal, { openModal }] = useModal();
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '字典列表',
        api: getDictPage,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        useSearchForm: true,
        showTableSetting: true,
        showIndexColumn: false,
        bordered: true,
        tableSetting: { fullScreen: true },
        actionColumn: {
          width: 110,
          title: '操作',
          dataIndex: 'action',
        },
      });

      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(id: string | number) {
        openModal(true, {
          id,
          isUpdate: true,
        });
      }

      function handleInfo(id: string | number) {
        openDrawer(true, {
          id,
          isUpdate: false,
        });
      }

      async function handleDelete(id: string | number) {
        await deleteDict(id);
        reload();
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerModal,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleInfo,
        handleSuccess,
        Auth,
      };
    },
  });
</script>
