<template>
  <div class="app-container">
    <a-row :gutter="30">
      <a-col :span="12">
        <a-card>
          <div align="center">
            <p>
              <img src="http://cdn.tycoding.cn/MIK-WxRzP9.png">
            </p>
            <p>
              <a href="https://github.com/Tumo-Team" target="_blank">
                <strong>Tumo Team —— Tumo-Boot</strong>
              </a>
            </p>
          </div>
          <a-collapse v-model="activeKey" :bordered="false">
            <a-collapse-panel key="0" header="项目介绍">
              <a href="https://github.com/Tumo-Team/Tumo-Boot" target="_blank">Tumo-Boot</a>
              是基于SpringBoot、Spring Security、Ant Design Vue开发的一套简洁、规范、开箱即用的权限系统，前后端分离结构。
            </a-collapse-panel>
            <a-collapse-panel key="1" header="项目源码">
              <p>
                在线预览：
                <a href="http://boot.tycoding.cn/" target="_blank">http://boot.tycoding.cn/</a>
              </p>
              <p>
                开源地址：
                <a
                  href="https://github.com/Tumo-Team/Tumo-Boot"
                  target="_blank"
                >https://github.com/Tumo-Team/Tumo-Boot</a>
              </p>
              <p>
                开发文档：
                <a href="http://docs.boot.tycoding.cn/" target="_blank">http://docs.boot.tycoding.cn/</a>
              </p>
            </a-collapse-panel>
            <a-collapse-panel key="2" header="联系作者">
              <p>
                Blog:
                <a href="http://tycoding.cn" target="_blank">http://tycoding.cn</a>
              </p>
              <p>
                Github:
                <a href="https://github.com/TyCoding" target="_blank">https://github.com/TyCoding</a>
              </p>
              <p>
                QQ交流群:<a href="#">866685601</a>
              </p>
            </a-collapse-panel>
          </a-collapse>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card>
          <div>
            <p><b>Tumo-Boot 项目开发时间线</b></p>
            <a-timeline>
              <a-timeline-item>2021.02 完善文档 ing...</a-timeline-item>
              <a-timeline-item>2021.02 增加Docker配置</a-timeline-item>
              <a-timeline-item>2021.01 完善开发文档</a-timeline-item>
              <a-timeline-item>2020.12 项目基础模块开发完成</a-timeline-item>
              <a-timeline-item>2020.08 初始化仓库</a-timeline-item>
            </a-timeline>
          </div>
          <div>
            <p><b>Tumo-Team 系列开源项目</b></p>
            <p>
              Tumo-Cloud（SpringCloud2020 & Nacos）：<a href="https://github.com/Tumo-Team/Tumo-Cloud" target="_blank">https://github.com/Tumo-Team/Tumo-Cloud</a>
            </p>
            <p>
              Tumo-Boot-Docs（SpringBoot手摸手开发文档）：<a href="https://github.com/Tumo-Team/Tumo-Boot-Docs" target="_blank">https://github.com/Tumo-Team/Tumo-Boot-Docs</a>
            </p>
            <p>
              Tumo-Boot（SpringBoot最佳实践）：<a href="https://github.com/Tumo-Team/Tumo-Boot" target="_blank">https://github.com/Tumo-Team/Tumo-Boot</a>
            </p>
            <p>
              Tumo-Element（ElementUI模板）：<a href="https://github.com/Tumo-Team/Tumo-Element" target="_blank">https://github.com/Tumo-Team/Tumo-Element</a>
            </p>
            <p>
              Tumo-AntV（AntDesignVue模板）：<a href="https://github.com/Tumo-Team/Tumo-AntV" target="_blank">https://github.com/Tumo-Team/Tumo-AntV</a>
            </p>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  components: {},
  data() {
    return {
      activeKey: ['0', '1', '2']
    }
  }
}
</script>

<style lang="less" scoped>
a {
  color: #1890ff;
}

.ant-collapse {
  background-color: #fff !important;
}
</style>
