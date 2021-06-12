<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :show-ok-btn="false"
    :title="'令牌信息'"
    width="50%"
    :cancelText="'关闭'"
    @close="handleClose"
  >
    <Description
      class="mt-4"
      :collapseOptions="{ canExpand: true, helpMessage: 'help me' }"
      :column="1"
      :data="info"
      :schema="infoSchema"
    />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { Description, useDescription } from '/@/components/Description/index';
  import { infoSchema } from './data';

  export default defineComponent({
    name: 'InfoModal',
    components: { BasicDrawer, Description },
    emits: ['register'],
    setup(_) {
      const info = ref({});
      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        setDrawerProps({ confirmLoading: false });
        info.value = data;
      });

      const [register] = useDescription({
        title: 'useDescription',
        data: info.value,
        schema: infoSchema,
      });

      function handleClose() {
        closeDrawer();
      }

      return { registerDrawer, register, info, infoSchema, handleClose };
    },
  });
</script>
