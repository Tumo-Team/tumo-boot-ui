<template>
  <PageWrapper>
    <div class="py-8 bg-white flex flex-col justify-center items-center">
      <BasicTable @register="registerTable">
        <template #toolbar>
          <a-button type="primary" @click="handleCreate"> 新增菜单 </a-button>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
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
        </template>
      </BasicTable>
      <MenuDrawer @register="registerDrawer" @success="handleSuccess" />
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';

  import { useDrawer } from '/@/components/Drawer';
  import MenuDrawer from './FormDrawer.vue';

  import { columns, searchFormSchema } from './data';
  import Auth from '/@/settings/constants/auth';
  import { getMenuTree, deleteMenu } from '/@/api/modules/upms/menu';

  export default defineComponent({
    name: 'Index',
    components: { PageWrapper, BasicTable, MenuDrawer, TableAction },
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
        isTreeTable: true,
        pagination: false,
        striped: false,
        useSearchForm: false,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        actionColumn: {
          width: 120,
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
