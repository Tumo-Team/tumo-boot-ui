<template>
  <h2 class="font-bold text-2xl xl:text-3xl enter-x text-center xl:text-left mb-6">
    {{ t('sys.login.signInFormTitle') }}
  </h2>
  <Form
    class="p-4 enter-x"
    :model="formData"
    :rules="rules"
    ref="formRef"
    v-show="getShow"
    @keypress.enter="handleLogin"
  >
    <FormItem name="username" class="enter-x">
      <Input
        size="large"
        v-model:value="formData.username"
        :placeholder="t('sys.login.userName')"
      />
    </FormItem>
    <FormItem name="password" class="enter-x">
      <InputPassword
        size="large"
        visibilityToggle
        v-model:value="formData.password"
        :placeholder="t('sys.login.password')"
      />
    </FormItem>
    <FormItem name="captcha" class="enter-x">
      <Input
        size="large"
        v-model:value="formData.captcha"
        :placeholder="t('sys.login.captcha')"
        class="captcha"
      >
        <template #addonAfter>
          <Spin :spinning="spinning">
            <Tooltip placement="bottom">
              <template #title>
                <span>点击更换验证码</span>
              </template>
              <img :src="'data:image/png;base64,' + captchaUrl" @click="handleCaptcha" />
            </Tooltip>
          </Spin>
        </template>
      </Input>
    </FormItem>

    <FormItem class="enter-x">
      <Button type="primary" size="large" block @click="handleLogin" :loading="loading">
        {{ t('sys.login.loginButton') }}
      </Button>
    </FormItem>
  </Form>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, toRaw, unref, computed, onMounted } from 'vue';

  import { Form, Input, Row, Col, Button, Tooltip, Spin } from 'ant-design-vue';

  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { useUserStore } from '/@/store/modules/user';
  import { LoginStateEnum, useLoginState } from './useLogin';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { onKeyStroke } from '@vueuse/core';
  import { isNull } from '/@/utils/is';

  import { getCaptcha } from '/@/api/auth';

  export default defineComponent({
    name: 'LoginForm',
    components: {
      [Col.name]: Col,
      [Row.name]: Row,
      Button,
      Form,
      FormItem: Form.Item,
      Input,
      InputPassword: Input.Password,
      Tooltip,
      Spin,
    },
    setup() {
      const { t } = useI18n();
      const { notification } = useMessage();
      const { prefixCls } = useDesign('login');
      const userStore = useUserStore();

      const { setLoginState, getLoginState } = useLoginState();

      const formRef = ref();
      const loading = ref(false);
      const captchaUrl = ref('');
      const spinning = ref<boolean>(false);

      const formData = reactive({
        username: 'demo',
        password: '123456',
        captcha: '',
        captchaKey: '',
      });

      const rules = {
        username: [{ required: true, message: t('sys.login.accountPlaceholder'), trigger: 'blur' }],
        password: [
          { required: true, message: t('sys.login.passwordPlaceholder'), trigger: 'blur' },
        ],
        captcha: [{ required: true, message: t('sys.login.captchaPlaceholder'), trigger: 'blur' }],
      };

      onKeyStroke('Enter', handleLogin);

      const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);
      // 页面渲染时触发
      onMounted(() => {
        // 获取验证码
        handleCaptcha();
      });

      // 验证码
      function handleCaptcha() {
        spinning.value = true;
        formData.captcha = '';
        getCaptcha()
          .then((res) => {
            captchaUrl.value = res.image;
            formData.captchaKey = res.key;
            spinning.value = false;
          })
          .catch((error) => {
            spinning.value = false;
            console.log(error);
          });
      }

      // 登录
      function handleLogin() {
        loading.value = true;
        formRef.value
          .validate()
          .then(async () => {
            const userInfo = await userStore.login(toRaw(formData));
            if (isNull(userInfo)) {
              loading.value = false;
              handleCaptcha();
            }
          })
          .catch((error) => {
            loading.value = false;
            handleCaptcha();
            notification.error({
              message: t('sys.login.formVerifyTitle'),
              description: t('sys.login.formVerifyDes'),
            });
            console.log('error', error);
          });
      }

      return {
        t,
        prefixCls,
        formRef,
        formData,
        rules,
        captchaUrl,
        spinning,
        handleCaptcha,
        handleLogin,
        loading,
        setLoginState,
        LoginStateEnum,
        getShow,
      };
    },
  });
</script>
<style lang="less">
  .captcha {
    .ant-input {
      min-width: 200px !important;
    }

    .ant-input-group-addon {
      background: transparent;
      border: 0;
      min-width: 140px !important;
    }
  }
</style>
