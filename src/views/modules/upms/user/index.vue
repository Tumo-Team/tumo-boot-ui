<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <DeptTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
    <BasicTable @register="registerTable" class="w-3/4 xl:w-4/5">
      <template #toolbar>
        <a-button v-auth="Auth.upms.user.add" type="primary" @click="handleCreate">
          新增用户
        </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              auth: Auth.upms.user.update,
              icon: 'mdi:lock-reset',
              color: 'success',
              onClick: handleResetPass.bind(null, record.id),
            },
            {
              auth: Auth.upms.user.update,
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record.id),
            },
            {
              auth: Auth.upms.user.delete,
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

  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import DeptTree from './DeptTree.vue';
  import Auth from '/@/utils/constants/auth';

  import { useModal } from '/@/components/Modal';
  import FormModal from './FormModal.vue';

  import { getUserPage, deleteUser, resetPass } from '/@/api/modules/upms/user';

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
          width: 120,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });
      const { createConfirm, createMessage } = useMessage();
      const { info, success, error } = createMessage;

      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleResetPass(id: string | number) {
        createConfirm({
          iconType: 'warning',
          title: '重置密码',
          content: '你确定将该账户密码重置为123456？',
          onOk: async () => {
            const data = await resetPass(id, null);
            if (data == null) {
              success('重置密码成功！');
            } else {
              error('重置密码失败，请联系管理员');
            }
          },
          onCancel: () => {
            info('已取消！');
          },
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
        handleResetPass,
        handleDelete,
        handleSuccess,
        handleSelect,
        Auth,
      };
    },
  });
</script>
