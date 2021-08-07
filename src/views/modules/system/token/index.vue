<template>
  <div>
    <BasicTable @register="registerTable">
      <template #action="{ record }">
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
    </BasicTable>
    <InfoModal @register="registerDrawer" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { getTokenPage, deleteToken } from '/@/api/modules/system/token';
  import Auth from '/@/settings/constants/auth';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';

  import InfoModal from './InfoModal.vue';

  import { columns, searchFormSchema } from './data';
  import { useDrawer } from '/@/components/Drawer';

  export default defineComponent({
    name: 'Index',
    components: { BasicTable, InfoModal, TableAction },
    setup() {
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '日志列表',
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
          slots: { customRender: 'action' },
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
