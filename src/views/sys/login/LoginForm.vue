<template>
  <LoginFormTitle v-show="getShow" class="enter-x" />
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
        class="fix-auto-fill"
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
<script lang="ts" setup>
  import { reactive, ref, unref, computed, onMounted, toRaw } from 'vue';

  import { Form, Input, Button, Tooltip, Spin } from 'ant-design-vue';
  import LoginFormTitle from './LoginFormTitle.vue';

  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { onKeyStroke } from '@vueuse/core';

  import { useUserStore } from '/@/store/modules/user';
  import { LoginStateEnum, useLoginState } from './useLogin';
  import { getCaptcha } from '/@/api/auth';

  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const { t } = useI18n();
  const { notification } = useMessage();
  const userStore = useUserStore();

  const { getLoginState } = useLoginState();

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
    password: [{ required: true, message: t('sys.login.passwordPlaceholder'), trigger: 'blur' }],
    captcha: [{ required: true, message: t('sys.login.smsPlaceholder'), trigger: 'blur' }],
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

  async function handleLogin() {
    formRef.value
      .validate()
      .then(async () => {
        loading.value = true;
        const userInfo = await userStore.login(toRaw(formData));
        if (userInfo) {
          notification.success({
            message: t('sys.login.loginSuccessTitle'),
            description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.realName}`,
            duration: 3,
          });
        }
      })
      .catch((error) => {
        loading.value = false;
        handleCaptcha();
        console.error(error);
      });
  }
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
