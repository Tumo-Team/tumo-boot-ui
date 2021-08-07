<template>
  <div>
    <BasicTable @register="registerTable">
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'carbon-view-filled',
              onClick: handleInfo.bind(null, record),
            },
            {
              auth: Auth.system.log.delete,
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
    <InfoModal @register="registerDrawer" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { getLogPage, deleteLog } from '/@/api/modules/system/log';
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
        api: getLogPage,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        useSearchForm: true,
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

      async function handleDelete(id: string | number) {
        await deleteLog(id);
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
