<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { itemFormSchema } from './data';
  import { getDictItem, updateDictItem, addDictItem } from '/@/api/modules/system/dictItem';
  import { isNullOrUnDef } from '/@/utils/is';

  export default defineComponent({
    name: 'FormModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);

      const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
        labelWidth: 100,
        schemas: itemFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          const dictItem = await getDictItem(data.id);
          dictItem.isSystem = String(dictItem.isSystem);
          setFieldsValue({
            ...dictItem,
          });
        }

        setFieldsValue({
          dictId: data.dictId,
        });
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增字典项' : '编辑字典项'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          if (isNullOrUnDef(values.id)) {
            // 新增
            await addDictItem(values);
          } else {
            // 修改
            await updateDictItem(values);
          }
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>
