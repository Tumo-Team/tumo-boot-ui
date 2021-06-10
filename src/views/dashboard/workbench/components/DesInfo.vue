<template>
  <div class="md:flex">
    <div class="md:w-2/4 w-full mr-4">
      <Collapse v-model:active-key="activeKey">
        <CollapsePanel key="1" header="项目信息">
          <List>
            <ListItem>
              <b>项目介绍：</b>一套基于SpringBoot2.4.x 和 Vue3.x & TypeScript
              的基础RBAC权限项目模板。
            </ListItem>
            <ListItem style="display: block">
              <b>项目文档：</b>
              <a href="http://docs.boot.tycoding.cn" target="_blank"
                >http://docs.boot.tycoding.cn</a
              >
            </ListItem>
            <ListItem style="display: block">
              <b>后端技术：</b>
              <Tag color="green">SpringBoot2.4.x</Tag>
              <Tag color="green">MybatisPlus</Tag>
              <Tag color="green">SpringSecurity</Tag>
            </ListItem>
            <ListItem style="display: block">
              <b>前端技术：</b>
              <Tag color="cyan">Vue3.x</Tag>
              <Tag color="cyan">TypeScript</Tag>
              <Tag color="cyan">Vite</Tag>
            </ListItem>
          </List>
        </CollapsePanel>
      </Collapse>
    </div>
    <div class="md:w-2/4 w-full">
      <Collapse v-model:active-key="activeKey">
        <CollapsePanel key="1" header="作者信息">
          <List>
            <ListItem style="display: block">
              <b>作者GitHub：</b>
              <a href="https://github.com/tycoding" target="_blank">https://github.com/tycoding</a>
            </ListItem>
            <ListItem style="display: block">
              <b>Github Team：</b>
              <a href="https://github.com/tumo-team" target="_blank"
                >https://github.com/tumo-team</a
              >
            </ListItem>
            <ListItem style="display: block">
              <b>作者Blog：</b>
              <a href="http://tycoding.cn" target="_blank">http://tycoding.cn</a>
            </ListItem>
            <ListItem style="display: block"> <b>交流群：</b>671017003 </ListItem>
          </List>
        </CollapsePanel>
      </Collapse>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { List, Collapse, Tag } from 'ant-design-vue';

  export default defineComponent({
    components: { List, ListItem: List.Item, Collapse, CollapsePanel: Collapse.Panel, Tag },
    setup() {
      const activeKey = ref([1, 2]);
      return {
        activeKey,
      };
    },
  });
</script>
