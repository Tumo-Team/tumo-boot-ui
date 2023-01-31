<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <BasicUpload
          v-auth="Auth.system.oss.add"
          :maxSize="200"
          :maxNumber="Infinity"
          @saveFile="handleCreate"
          :emptyHidePreview="true"
          :api="uploadListApi"
          class="my-5"
        />
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'url'">
          <a :href="record.url" target="_blank">{{ record.url }}</a>
        </template>
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                auth: Auth.system.oss.update,
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record.id),
              },
              {
                auth: Auth.system.oss.delete,
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
    <FormModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicUpload } from '/@/components/Upload';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';

  import { useModal } from '/@/components/Modal';
  import FormModal from './FormModal.vue';

  import { columns, searchFormSchema } from './data';
  import { getOssPage, addOssList, deleteOss } from '/@/api/modules/system/oss';
  import { uploadListApi } from '/@/api/modules/system/upload';
  import Auth from '/@/settings/constants/auth';

  export default defineComponent({
    name: 'Index',
    components: { BasicTable, BasicUpload, FormModal, TableAction },
    setup() {
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: '本地文件列表',
        api: getOssPage,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        useSearchForm: true,
        showTableSetting: true,
        showIndexColumn: false,
        bordered: true,
        tableSetting: { fullScreen: true },
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
        },
      });

      async function handleCreate(list: string[]) {
        await addOssList(list);
        reload();
      }

      function handleEdit(id: string | number) {
        openModal(true, {
          id,
          isUpdate: true,
        });
      }

      async function handleDelete(id: string | number) {
        await deleteOss(id);
        reload();
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerModal,
        uploadListApi,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        Auth,
      };
    },
  });
</script>
