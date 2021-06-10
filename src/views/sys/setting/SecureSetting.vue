<template>
  <CollapseContainer title="安全设置" :canExpan="false">
    <a-row :gutter="24">
      <a-col :span="14">
        <BasicForm @register="register" />
      </a-col>
    </a-row>
    <Button type="primary" @click="handleSubmit"> 更新密码 </Button>
  </CollapseContainer>
</template>
<script lang="ts">
  import { Button, Row, Col } from 'ant-design-vue';
  import { defineComponent, onMounted } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container/index';

  import { getUserInfo } from '/@/api/auth';
  import { updateUser } from '/@/api/modules/upms/user';
  import { secureSettingForm } from './data';
  import { useUserStore } from '/@/store/modules/user';

  export default defineComponent({
    components: { CollapseContainer, BasicForm, Button, [Row.name]: Row, [Col.name]: Col },
    setup() {
      const [register, { setFieldsValue, validate }] = useForm({
        labelWidth: 120,
        schemas: secureSettingForm,
        showActionButtonGroup: false,
      });
      const userStore = useUserStore();

      const { createMessage } = useMessage();
      const { error } = createMessage;

      onMounted(async () => {
        const data = await getUserInfo();
        const { user } = data;
        setFieldsValue({
          id: user.id,
        });
      });

      async function handleSubmit() {
        const values = await validate();
        if (values.password !== values.repass) {
          error('两次输入密码不一致');
          return;
        }
        await updateUser(values);
        userStore.confirmLoginOut();
      }

      return {
        register,
        handleSubmit,
      };
    },
  });
</script>
<style lang="less" scoped>
  .extra {
    float: right;
    margin-top: 10px;
    margin-right: 30px;
    font-weight: normal;
    color: #1890ff;
    cursor: pointer;
  }
</style>
