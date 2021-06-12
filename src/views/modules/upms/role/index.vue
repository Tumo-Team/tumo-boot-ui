<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button v-auth="Auth.upms.role.add" type="primary" @click="handleCreate">
          新增角色
        </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              auth: Auth.upms.role.update,
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record.id),
            },
            {
              auth: Auth.upms.role.delete,
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
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getRoleTree, deleteRole } from '/@/api/modules/upms/role';
  import Auth from '/@/utils/constants/auth';

  import { useDrawer } from '/@/components/Drawer';
  import RoleDrawer from './FormModal.vue';

  import { columns, searchFormSchema } from './data';

  export default defineComponent({
    name: 'Index',
    components: { BasicTable, RoleDrawer, TableAction },
    setup() {
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '角色列表',
        api: getRoleTree,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        pagination: false,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        actionColumn: {
          width: 80,
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

      async function handleDelete(id: string | number) {
        await deleteRole(id);
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
        handleDelete,
        handleSuccess,
        Auth,
      };
    },
  });
</script>
