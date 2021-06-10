<template>
  <Collapse v-model:active-key="activeKey">
    <CollapsePanel key="1" header="开源项目（开发中）">
      <List>
        <ListItem style="display: block">
          <b>Tumo-Boot：</b>
          <a href="https://github.com/tumo-team/tumo-boot" target="_blank"
            >https://github.com/tumo-team/tumo-boot</a
          >
          ( 一套基于SpringBoot2.4.x 和 Vue3.x & TypeScript 的基础RBAC权限项目模板 )
        </ListItem>
        <ListItem style="display: block">
          <b>Tumo-Boot-Pro：</b>
          <a href="https://github.com/tumo-team/tumo-boot-pro" target="_blank"
            >https://github.com/tumo-team/tumo-boot-pro</a
          >
          ( 将在Tumo-Boot项目的基础上集成更多常用功能模块 )
        </ListItem>
        <ListItem style="display: block">
          <b>Tumo-Cloud：</b>
          <a href="https://github.com/tumo-team/tumo-cloud" target="_blank"
            >https://github.com/tumo-team/tumo-cloud</a
          >
          ( 一套基于SpringCloud Alibaba & Nacos 的基础RBAC分布式微服务权限项目模板 )
        </ListItem>
        <ListItem style="display: block">
          <b>Tumo-Cloud-Pro：</b>
          <a href="https://github.com/tumo-team/tumo-cloud-pro" target="_blank"
            >https://github.com/tumo-team/tumo-cloud-pro</a
          >
          ( 将在Tumo-Cloud项目的基础上集成更多常用功能模块 )
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
  import { List, Collapse, Tag } from 'ant-design-vue';

  export default defineComponent({
    components: { List, ListItem: List.Item, Collapse, CollapsePanel: Collapse.Panel, Tag },
    setup() {
      const activeKey = ref([1]);
      return {
        activeKey,
      };
    },
  });
</script>
