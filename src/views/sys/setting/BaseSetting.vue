<template>
  <CollapseContainer title="基本设置" :canExpan="false">
    <a-row :gutter="24">
      <a-col :span="14">
        <BasicForm @register="register" />
      </a-col>
      <a-col :span="10">
        <div class="change-avatar">
          <div class="mb-2"> 头像 </div>
          <img width="140" :src="avatarImg" />
          <Upload :showUploadList="false">
            <Button class="ml-5"> <Icon icon="feather:upload" />更换头像 </Button>
          </Upload>
        </div>
      </a-col>
    </a-row>
    <Button type="primary" @click="handleSubmit"> 更新基本信息 </Button>
  </CollapseContainer>
</template>
<script lang="ts">
  import { Button, Upload, Row, Col } from 'ant-design-vue';
  import { defineComponent, onMounted, ref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container/index';
  import Icon from '/@/components/Icon/index';

  import { useMessage } from '/@/hooks/web/useMessage';

  import { getUserInfo } from '/@/api/auth';
  import { updateUser } from '/@/api/modules/upms/user';
  import { baseSetSchemas } from './data';

  export default defineComponent({
    components: {
      BasicForm,
      CollapseContainer,
      Button,
      Upload,
      Icon,
      [Row.name]: Row,
      [Col.name]: Col,
    },
    setup() {
      const { createMessage, createConfirm } = useMessage();
      const avatarImg = ref<string>('');

      const [register, { setFieldsValue, validate }] = useForm({
        labelWidth: 120,
        schemas: baseSetSchemas,
        showActionButtonGroup: false,
      });

      onMounted(async () => {
        const data = await getUserInfo();
        const { user, dept, roles } = data;
        avatarImg.value = user.avatar;
        user.deptName = dept?.name ?? '';
        const rolesName: any[] = [];
        roles.forEach((r) => {
          rolesName.push(r.name);
        });
        user.rolesName = rolesName;
        setFieldsValue(user);
      });

      async function handleSubmit() {
        const values = await validate();
        try {
          await updateUser(values);
          createConfirm({
            title: '基本信息更新成功',
            iconType: 'success',
            content: '是否立即刷新页面使修改生效？',
            onOk: () => {
              window.location.reload();
            },
            onCancel: () => {
              createMessage.info('数据将在刷新页面后生效');
            },
          });
        } catch (error) {
          console.log(error);
        }
      }

      return {
        avatarImg,
        register,
        handleSubmit,
      };
    },
  });
</script>

<style lang="less" scoped>
  .change-avatar {
    img {
      display: block;
      margin-bottom: 15px;
      border-radius: 50%;
    }
  }
</style>
