<template>
  <PageWrapper>
    <div class="py-8 bg-white flex flex-col justify-center items-center">
      <BasicTable @register="registerTable">
        <template #toolbar>
          <a-button type="primary" @click="handleCreate"> 新增部门 </a-button>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <TableAction
              :actions="[
                {
                  auth: Auth.upms.dept.update,
                  icon: 'clarity:note-edit-line',
                  onClick: handleEdit.bind(null, record.id),
                },
                {
                  auth: Auth.upms.dept.delete,
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
      <DeptModal @register="registerModal" @success="handleSuccess" />
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';

  import { useModal } from '/@/components/Modal';
  import DeptModal from './FormModal.vue';

  import { columns, searchFormSchema } from './data';
  import Auth from '/@/settings/constants/auth';
  import { getDeptTree, deleteDept } from '/@/api/modules/upms/dept';

  export default defineComponent({
    name: 'Index',
    components: { PageWrapper, BasicTable, DeptModal, TableAction },
    setup() {
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: '部门列表',
        api: getDeptTree,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        pagination: false,
        striped: false,
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
        await deleteDept(id);
        reload();
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        Auth,
      };
    },
  });
</script>
