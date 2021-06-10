<template>
  <Card
    size="small"
    :loading="$attrs.loading"
    title="细颗粒度权限（根据用户角色的权限标识，实现按钮级别权限控制）"
  >
    <div class="!my-4"> 当前登录用户权限标识列表：<b v-text="permList"></b> </div>
    <Divider />

    <Alert class="mt-4" type="info" :message="'函数方式，用法：' + funMode" show-icon />
    <div v-if="hasPermission('user:list')">函数方式：user:list权限</div>
    <Divider />

    <Alert class="mt-4" type="info" :message="'指令方式，用法：' + directMode" show-icon />
    <div v-auth="'user:list'">指令方式：user:list权限</div>
    <Divider />

    <Alert class="mt-4" type="info" :message="'组件方式，用法：' + compMode" show-icon />
    <Authority :value="'user:list'"> 组件方式：user:list权限 </Authority>
  </Card>
</template>
<script lang="ts">
  import { computed, defineComponent, ref } from 'vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { useUserStore } from '/@/store/modules/user';

  import { Authority } from '/@/components/Authority/index';
  import { Card, Alert, Divider } from 'ant-design-vue';

  export default defineComponent({
    components: { Card, Alert, Divider, Authority },
    setup() {
      const userStore = useUserStore();
      const permList = computed(() => {
        const permList = userStore.getPermList;
        return permList;
      });

      const funMode = ref('<div v-if="hasPermission(\'user:list\')"></div>');
      const directMode = ref('<div v-auth="\'user:list\'"></div>');
      const compMode = ref(
        "<Authority :value=\"'user:list'\"></Authority>   【 import { Authority } from '/@/components/Authority/index' 】"
      );

      const { hasPermission } = usePermission();
      return {
        funMode,
        directMode,
        compMode,
        permList,
        hasPermission,
      };
    },
  });
</script>
