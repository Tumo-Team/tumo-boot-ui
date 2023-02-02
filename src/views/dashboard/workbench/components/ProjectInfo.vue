<template>
  <Collapse v-model:active-key="activeKey">
    <CollapsePanel key="1" header="开源项目（维护中）">
      <List>
        <ListItem style="display: block">
          <b>Tumo-Boot：</b>
          <a href="https://github.com/tumo-team/tumo-boot" target="_blank"
            >https://github.com/tumo-team/tumo-boot</a
          >
          ( 一套基于SpringBoot2.x 和 Vue3.x & TypeScript 的RBAC权限项目 )
        </ListItem>
        <ListItem style="display: block">
          <b>Tumo-Cloud：</b>
          <a href="https://github.com/tumo-team/tumo-cloud" target="_blank"
            >https://github.com/tumo-team/tumo-cloud</a
          >
          ( 一套基于SpringCloud Alibaba & Nacos 的RBAC分布式微服务权限项目 )
        </ListItem>
        <ListItem style="display: block">
          <b>Tumo-Boot开发文档：</b>
          <a href="http://docs.boot.tycoding.cn" target="_blank">http://docs.boot.tycoding.cn</a>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <b>Tumo-Cloud开发文档：</b>
          <a href="http://docs.cloud.tycoding.cn" target="_blank">http://docs.cloud.tycoding.cn</a>
        </ListItem>
      </List>
    </CollapsePanel>
    <CollapsePanel key="2" header="开源项目（不再维护）">
      <List>
        <ListItem style="display: block">
          <b>Cloud-Template：</b>
          <a href="https://github.com/tycoding/cloud-template" target="_blank"
            >https://github.com/tycoding/cloud-template</a
          >
          ( 一套基于SpringCloud & Eureka 基础项目模板 )
        </ListItem>
        <ListItem style="display: block">
          <b>Tumo Blog：</b>
          <a href="https://github.com/tycoding/tumo" target="_blank"
            >https://github.com/tycoding/tumo</a
          >
          ( 一套基于SpringBoot2.x的博客项目，SpringBoot入门开发必备。前端基于HTML、Vue.js；单体项目
          )
        </ListItem>
        <ListItem style="display: block">
          <b>Tumo Blog Vue：</b>
          <a href="https://github.com/tycoding/tumo-vue" target="_blank"
            >https://github.com/tycoding/tumo-vue</a
          >
          ( Tumo Blog 的Vue版本实现，前端基于vue-element-admin实现；前后端分离 )
        </ListItem>
      </List>
    </CollapsePanel>
  </Collapse>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { List, Collapse } from 'ant-design-vue';
  export default defineComponent({
    components: { List, ListItem: List.Item, Collapse, CollapsePanel: Collapse.Panel },
    setup() {
      const activeKey = ref([1]);
      return {
        activeKey,
      };
    },
  });
</script>
