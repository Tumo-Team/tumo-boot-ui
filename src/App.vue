<template>
  <ConfigProvider :locale="getAntdLocale">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ConfigProvider>
</template>

<script lang="ts" setup>
  import { ConfigProvider } from 'ant-design-vue';
  import { AppProvider } from '/@/components/Application';
  import { useTitle } from '/@/hooks/web/useTitle';
  import { useLocale } from '/@/locales/useLocale';
  import { useWatermark } from '/@/hooks/web/useWatermark';

  import 'dayjs/locale/zh-cn';
  import { onMounted } from 'vue';
  // support Multi-language
  const { getAntdLocale } = useLocale();

  // Listening to page changes and dynamically changing site titles
  useTitle();

  // 全局水印，请自行删除
  const { setWatermark } = useWatermark();
  onMounted(() => {
    setWatermark('Tumo Team');
  });
</script>
