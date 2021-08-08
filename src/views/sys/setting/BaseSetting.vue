<template>
  <CollapseContainer title="基本设置" :canExpan="false">
    <a-row :gutter="24">
      <a-col :span="14">
        <BasicForm @register="register" />
      </a-col>
      <a-col :span="10">
        <div class="change-avatar">
          <div class="mb-2"> 头像 </div>
          <img width="140" :src="userInfo.avatar" />
          <Upload
            :action="uploadUrl"
            :headers="headers"
            name="file"
            @change="handlerFileChange"
            :showUploadList="false"
          >
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
  import { defineComponent, onMounted, ref, toRaw } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import Icon from '/@/components/Icon/index';

  import { getToken } from '/@/utils/auth';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useUserStoreWithOut } from '/@/store/modules/user';

  import { getUserInfo } from '/@/api/auth';
  import { updateUser } from '/@/api/modules/upms/user';
  import { Api } from '/@/api/modules/system/upload';
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
      const userStore = useUserStoreWithOut();
      const userInfo = ref({ avatar: '' });

      const [register, { setFieldsValue, validate }] = useForm({
        labelWidth: 120,
        schemas: baseSetSchemas,
        showActionButtonGroup: false,
      });

      const headers = ref<any>({
        Authorization: getToken(),
      });

      onMounted(async () => {
        const data = await getUserInfo();
        const { user, dept, roles } = data;
        user.deptName = dept?.name ?? '';
        const rolesName: any[] = [];
        roles.forEach((r) => {
          rolesName.push(r.name);
        });
        user.rolesName = rolesName;
        userInfo.value = user;
        setFieldsValue(user);
      });

      async function handlerFileChange(obj) {
        const res = toRaw(obj.file.response);
        if (res !== null && res !== undefined) {
          if (res.code === 200) {
            userInfo.value.avatar = res.data.url;

            await updateUser(userInfo.value);
            createConfirm({
              title: '头像更新成功',
              iconType: 'success',
              content: '重新登录系统后生效！是否重新登录？',
              onOk: () => {
                userStore.logout();
              },
              onCancel: () => {
                createMessage.info('头像信息将在重新登录系统后生效');
              },
            });
          }
        }
      }

      async function handleSubmit() {
        const values = await validate();
        try {
          await updateUser(values);
        } catch (error) {
          console.log(error);
        }
      }

      return {
        register,
        headers,
        userInfo,
        uploadUrl: Api.PutFileApi,
        handlerFileChange,
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
