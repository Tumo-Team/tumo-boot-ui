<template>
  <PageWrapper>
    <div class="py-8 bg-white flex flex-col justify-center items-center">
      <BasicTable @register="registerTable">
        <template #toolbar>
          <a-button type="primary" @click="handleCreate"> 新增角色 </a-button>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
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
        </template>
      </BasicTable>
      <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useDrawer } from '/@/components/Drawer';

  import RoleDrawer from './FormDrawer.vue';
  import { columns, searchFormSchema } from './data';
  import Auth from '/@/settings/constants/auth';
  import { getRoleTree, deleteRole } from '/@/api/modules/upms/role';

  export default defineComponent({
    name: 'Index',
    components: { PageWrapper, BasicTable, RoleDrawer, TableAction },
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
        useSearchForm: false,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
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
