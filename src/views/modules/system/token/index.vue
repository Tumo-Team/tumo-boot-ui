<template>
  <PageWrapper>
    <div class="py-8 bg-white flex flex-col justify-center items-center">
      <BasicTable @register="registerTable">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <TableAction
              :actions="[
                {
                  auth: Auth.system.token.info,
                  icon: 'carbon-view-filled',
                  onClick: handleInfo.bind(null, record),
                },
                {
                  auth: Auth.system.token.delete,
                  icon: 'ant-design:delete-outlined',
                  color: 'error',
                  popConfirm: {
                    title: '是否强制下线该用户',
                    confirm: handleDelete.bind(null, record.value),
                  },
                },
              ]"
            />
          </template>
        </template>
      </BasicTable>
      <InfoModal @register="registerDrawer" />
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { getTokenPage, deleteToken } from '/@/api/modules/system/token';
  import { PageWrapper } from '/@/components/Page';

  import { useDrawer } from '/@/components/Drawer';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import InfoModal from './InfoModal.vue';

  import { columns, searchFormSchema } from './data';
  import Auth from '/@/settings/constants/auth';

  export default defineComponent({
    name: 'Index',
    components: { PageWrapper, BasicTable, InfoModal, TableAction },
    setup() {
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '令牌管理',
        api: getTokenPage,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        showIndexColumn: false,
        useSearchForm: false,
        showTableSetting: true,
        bordered: true,
        tableSetting: { fullScreen: true },
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
        },
      });

      async function handleDelete(token: string) {
        await deleteToken(token);
        reload();
      }

      function handleInfo(record: any) {
        openDrawer(true, record);
      }

      return {
        registerTable,
        registerDrawer,
        handleInfo,
        handleDelete,
        Auth,
      };
    },
  });
</script>
