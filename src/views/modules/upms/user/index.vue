<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <DeptTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
    <BasicTable @register="registerTable" class="w-3/4 xl:w-4/5">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增用户</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record.id),
            },
            {
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
    <FormModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import DeptTree from './DeptTree.vue';

  import { useModal } from '/@/components/Modal';
  import FormModal from './FormModal.vue';

  import { getUserPage, deleteUser } from '/@/api/modules/upms/user';

  import { columns, searchFormSchema } from './data';

  export default defineComponent({
    name: 'Index',
    components: { BasicTable, PageWrapper, DeptTree, FormModal, TableAction },
    setup() {
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: '用户列表',
        api: getUserPage,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
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

      async function handleDelete(id: string | number) {
        await deleteUser(id);
        reload();
      }

      function handleSuccess() {
        reload();
      }

      function handleSelect(deptId = '') {
        reload({ searchInfo: { deptId } });
      }

      return {
        registerTable,
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleSelect,
      };
    },
  });
</script>
