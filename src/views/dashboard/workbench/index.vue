<template>
  <div class="p-4">
    <DesInfo class="enter-y" />
    <ProjectInfo class="!my-4 enter-y" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import DesInfo from './components/DesInfo.vue';
  import ProjectInfo from './components/ProjectInfo.vue';
  export default defineComponent({
    components: { DesInfo, ProjectInfo },
    setup() {
      return {};
    },
  });
</script>
