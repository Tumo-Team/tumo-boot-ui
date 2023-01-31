<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <DeptTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
    <BasicTable @register="registerTable" class="w-3/4 xl:w-4/5" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增用户</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
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
      </template>
    </BasicTable>
    <AccountModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import DeptTree from './DeptTree.vue';

  import { useModal } from '/@/components/Modal';
  import AccountModal from './FormModal.vue';

  import { columns, searchFormSchema } from './data';
  import { useMessage } from '/@/hooks/web/useMessage';
  import Auth from '/@/settings/constants/auth';
  import { getUserPage, deleteUser, resetPass } from '/@/api/modules/upms/user';

  export default defineComponent({
    name: 'Index',
    components: { BasicTable, PageWrapper, DeptTree, AccountModal, TableAction },
    setup() {
      const [registerModal, { openModal }] = useModal();
      const searchInfo = reactive<Recordable>({});
      const [registerTable, { reload }] = useTable({
        title: '账号列表',
        api: getUserPage,
        rowKey: 'id',
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        handleSearchInfoFn(info) {
          console.log('handleSearchInfoFn', info);
          return info;
        },
        actionColumn: {
          width: 120,
          title: '操作',
          dataIndex: 'action',
        },
      });
      const { createConfirm, createMessage } = useMessage();
      const { info, success, error } = createMessage;

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
        await reload();
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

      function handleSuccess() {
        reload();
      }

      function handleSelect(deptId = '') {
        searchInfo.deptId = deptId;
        reload();
      }

      return {
        registerTable,
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleSelect,
        handleResetPass,
        searchInfo,
        Auth,
      };
    },
  });
</script>
