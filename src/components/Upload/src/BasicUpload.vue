<template>
  <div>
    <a-button-group>
      <a-button type="primary" @click="openUploadModal" preIcon="carbon:cloud-upload">
        {{ t('component.upload.upload') }}
      </a-button>
      <Tooltip placement="bottom">
        <template #title>
          {{ t('component.upload.uploaded') }}
          <template v-if="fileListRef.length">
            {{ fileListRef.length }}
          </template>
        </template>
      </Tooltip>
    </a-button-group>

    <UploadModal v-bind="bindValue" @register="registerUploadModal" @change="handleChange" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, watch, unref, computed } from 'vue';

  import UploadModal from './UploadModal.vue';
  import { Tooltip } from 'ant-design-vue';

  import { useModal } from '/@/components/Modal';

  import { uploadContainerProps } from './props';
  import { omit } from 'lodash-es';
  import { useI18n } from '/@/hooks/web/useI18n';

  export default defineComponent({
    name: 'BasicUpload',
    components: { UploadModal, Tooltip },
    props: uploadContainerProps,
    emits: ['change'],

    setup(props, { emit, attrs }) {
      const { t } = useI18n();
      // 上传modal
      const [registerUploadModal, { openModal: openUploadModal }] = useModal();

      const fileListRef = ref<string[]>([]);

      const bindValue = computed(() => {
        const value = { ...attrs, ...props };
        return omit(value, 'onChange');
      });

      watch(
        () => props.value,
        (value = []) => {
          fileListRef.value = value;
        },
        { immediate: true }
      );

      // 上传modal保存操作
      function handleChange(urls: string[]) {
        fileListRef.value = [...unref(fileListRef), ...(urls || [])];
        emit('change', fileListRef.value);
      }

      return {
        registerUploadModal,
        openUploadModal,
        handleChange,
        fileListRef,
        bindValue,
        t,
      };
    },
  });
</script>
