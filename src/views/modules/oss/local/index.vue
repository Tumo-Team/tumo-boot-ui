<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <BasicUpload
          :maxSize="200"
          :maxNumber="Infinity"
          @change="handleCreate"
          :emptyHidePreview="true"
          :api="uploadListApi"
          class="my-5"
        />
      </template>
      <template #url="{ record }">
        <a :href="record.url" target="_blank">{{ record.url }}</a>
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
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { getOssPage, deleteOss } from '/@/api/modules/oss/oss';
  import { uploadListApi } from '/@/api/modules/oss/upload';

  import { BasicUpload } from '/@/components/Upload';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';

  import { useModal } from '/@/components/Modal';
  import FormModal from './FormModal.vue';

  import { columns, searchFormSchema } from './data';

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
        pagination: true,
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

      function handleCreate(list: string[]) {
        console.log(list);
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
      };
    },
  });
</script>
