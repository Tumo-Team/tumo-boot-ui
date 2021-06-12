<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button v-auth="Auth.upms.menu.add" type="primary" @click="handleCreate">
          新增菜单
        </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              auth: Auth.upms.menu.add,
              icon: 'ant-design:plus-outlined',
              onClick: handleAddChild.bind(null, record.id),
            },
            {
              auth: Auth.upms.menu.update,
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record.id),
            },
            {
              auth: Auth.upms.menu.delete,
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
    <FormModal @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getMenuTree, deleteMenu } from '/@/api/modules/upms/menu';
  import Auth from '/@/utils/constants/auth';

  import { useDrawer } from '/@/components/Drawer';
  import FormModal from './FormModal.vue';

  import { columns, searchFormSchema } from './data';

  export default defineComponent({
    name: 'Index',
    components: { BasicTable, FormModal, TableAction },
    setup() {
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '菜单列表',
        api: getMenuTree,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        pagination: false,
        striped: false,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        actionColumn: {
          width: 120,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
        },
      });

      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      function handleEdit(id: string | number) {
        openDrawer(true, {
          id,
          isUpdate: true,
        });
      }

      function handleAddChild(id: string | number) {
        openDrawer(true, {
          parentId: id,
          isUpdate: false,
        });
      }

      async function handleDelete(id: string | number) {
        await deleteMenu(id);
        reload();
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleAddChild,
        handleDelete,
        handleSuccess,
        Auth,
      };
    },
  });
</script>
