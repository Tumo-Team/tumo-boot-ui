<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { userFormSchema } from './data';
  import { checkUserName, getUser, addUser, updateUser } from '/@/api/modules/upms/user';
  import { getDeptTree } from '/@/api/modules/upms/dept';
  import { isNullOrUnDef } from '/@/utils/is';

  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    name: 'FormModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);

      const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
        labelWidth: 100,
        schemas: userFormSchema,
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
          const user = await getUser(data.id);
          setFieldsValue({
            ...user,
          });
        }

        const treeData = await getDeptTree();
        console.log(treeData);
        updateSchema([
          {
            field: 'password',
            show: !unref(isUpdate),
            required: !unref(isUpdate),
          },
          {
            field: 'deptId',
            componentProps: { treeData },
          },
        ]);
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增用户' : '编辑用户'));

      async function handleSubmit() {
        try {
          const values = await validate();
          const { createMessage } = useMessage();
          if (!(await checkUserName(values))) {
            createMessage.warn('该用户名已存在');
            return;
          }

          setModalProps({ confirmLoading: true });
          if (isNullOrUnDef(values.id)) {
            // 新增
            await addUser(values);
          } else {
            // 修改
            await updateUser(values);
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
